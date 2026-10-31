"use client";

import type { ModalView } from "./host";
import type { ModalManager, ModalManagerOptions, ModalProps, ModalRegistry, ModalResult } from "./types";
import type { ComponentType } from "react";

import { useEffect, useSyncExternalStore } from "react";

import { ModalEntry } from "./host";

interface ModalInstance {
  key: string;
  view: ModalView;
  presented: boolean;
  settled: boolean;
  resolve: (result: ModalResult<unknown>) => void;
  reject: (error: unknown) => void;
}

const EMPTY: readonly ModalView[] = [];

/**
 * Create once outside rendering; accepts regular, memo, and lazy components.
 *
 * Call `open` on the client, outside rendering. The Host renders nothing during SSR.
 *
 * Pass the caller's `hot` and a stable `key` to retain instances and promises during HMR.
 * Reload the page when the manager implementation changes.
 *
 * @example
 * export const modals = createModalManager({ edit: EditModal }, { hot: import.meta.hot, key: "modals" });
 * if (import.meta.hot) import.meta.hot.accept();
 */
export function createModalManager<Registry extends ModalRegistry>(
  registry: Registry & {
    [Key in keyof Registry]: Registry[Key] extends ComponentType<infer Props> ? (Props extends ModalProps<never> ? unknown : never) : never;
  },
  options?: ModalManagerOptions,
): ModalManager<Registry> {
  const cache = options?.hot
    ? ((options.hot.data.__deftuiModalManagers ??= new Map<string, unknown>()) as Map<string, unknown>)
    : undefined;

  const cached = (options && cache?.get(options.key)) as ModalManager<Registry> | undefined;

  if (cached) {
    cached.setRegistry(registry);
    return cached;
  }

  let definitions: ModalRegistry = registry;
  let snapshot = EMPTY;
  let nextId = 0;
  let hostAttached = false;

  const instances = new Map<number, ModalInstance>();
  const listeners = new Set<() => void>();

  function publish() {
    snapshot = Array.from(instances.values(), (instance) => instance.view);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function getSnapshot() {
    return snapshot;
  }

  function getServerSnapshot() {
    return EMPTY;
  }

  function remove(id: number) {
    if (instances.delete(id)) publish();
  }

  function finish(instance: ModalInstance, result: ModalResult<unknown>) {
    if (instance.settled) return;
    instance.settled = true;

    if (instance.presented) {
      instance.view = {
        ...instance.view,
        modal: {
          ...instance.view.modal,
          rootProps: { ...instance.view.modal.rootProps, open: false },
        },
      };

      publish();
    } else {
      // An instance closed before committing has no exit animation to wait for.
      remove(instance.view.id);
    }

    instance.resolve(result);
  }

  function onPresent(id: number, component: ModalView["component"]) {
    const instance = instances.get(id);
    if (instance?.view.component === component) instance.presented = true;
  }

  function onError(id: number, error: unknown) {
    const instance = instances.get(id);
    if (!instance) return;
    remove(id);

    if (!instance.settled) {
      instance.settled = true;
      instance.reject(error);
    }
  }

  function attachHost() {
    if (hostAttached) throw new Error("A modal manager can only have one mounted Host.");
    hostAttached = true;

    return () => {
      hostAttached = false;

      // React Strict Mode immediately reattaches effects during its development check.
      queueMicrotask(() => {
        if (hostAttached) return;

        const remaining = Array.from(instances.values());
        instances.clear();
        publish();

        for (const instance of remaining) {
          if (instance.settled) continue;
          instance.settled = true;
          instance.resolve({ status: "dismissed" });
        }
      });
    };
  }

  function Host() {
    const views = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    useEffect(attachHost, []);

    return views.map((view) => <ModalEntry key={view.id} view={view} onPresent={onPresent} onError={onError} />);
  }

  function open(key: string, props: object = {}): Promise<ModalResult<unknown>> {
    const definition = definitions[key];
    if (!definition) throw new Error(`Unknown modal: ${key}`);

    return new Promise((resolve, reject) => {
      const id = nextId++;

      const instance: ModalInstance = {
        key,
        presented: false,
        settled: false,
        resolve,
        reject,
        view: {
          id,

          // Registry props/results are erased only at the internal rendering boundary.
          component: definition as unknown as ModalView["component"],
          props,
          modal: {
            resolve: (value) => finish(instance, { status: "resolved", value }),
            dismiss: () => finish(instance, { status: "dismissed" }),
            rootProps: {
              open: true,
              onOpenChange: (isOpen) => {
                if (!isOpen) finish(instance, { status: "dismissed" });
              },
              onOpenChangeComplete: (isOpen) => {
                if (!isOpen && instance.settled) remove(id);
              },
            },
          },
        },
      };

      instances.set(id, instance);
      publish();
    });
  }

  function dismissAll() {
    for (const instance of instances.values()) finish(instance, { status: "dismissed" });
  }

  function setRegistry(nextRegistry: Registry) {
    definitions = nextRegistry;

    for (const instance of instances.values()) {
      if (instance.settled) continue;

      const definition = definitions[instance.key];

      if (!definition) {
        finish(instance, { status: "dismissed" });
        continue;
      }

      const component = definition as unknown as ModalView["component"];
      if (component === instance.view.component) continue;

      instance.presented = false;
      instance.view = { ...instance.view, component };
    }

    publish();
  }

  const manager: ModalManager<Registry> = { Host, open: open as ModalManager<Registry>["open"], dismissAll, setRegistry };
  if (options) cache?.set(options.key, manager);

  return manager;
}
