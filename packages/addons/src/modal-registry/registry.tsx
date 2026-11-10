import type { ModalDefinitionRecord, ModalView } from "./provider";
import type { Modal, ModalCall, ModalController, ModalDefinition, ModalHandle, ModalResult } from "./types";
import type { ModalRegistry, ModalRegistryOptions, ModalRootComponent, ModalRootProps, ModalShowOptions } from "./types";
import type { ComponentType, ReactNode } from "react";

import { useEffect, useSyncExternalStore } from "react";

import { ModalEntry } from "./provider";

interface ModalInstance {
  id: number;
  definition: ModalDefinitionRecord;
  parentId: number | null;
  children: Set<ModalInstance>;
  props: Record<string, unknown>;
  phase: "active" | "waiting" | "closing";
  presented: boolean;
  resolveResult: (result: ModalResult<unknown>) => void;
  rejectResult: (error: unknown) => void;
  call: ModalCall<Record<string, unknown>, unknown>;
  modal: ModalController<Record<string, unknown>, unknown>;
  view?: ModalView;
}

const EMPTY: readonly ModalView[] = [];

/**
 * Create one registry for the application and define modal modules locally.
 * Definitions are callable components, so modal modules remain Fast Refresh-compatible.
 *
 * @example
 * export const registry = createModalRegistry({ hot: import.meta.hot, key: "modals" });
 *
 * export const EditDialog = registry.define(Dialog, EditDialogContent);
 * function EditDialogContent({ id }: Modal<{ id: string }>) {
 *   return <Dialog.Content>{id}</Dialog.Content>;
 * }
 *
 * const handle = EditDialog.show({ id: "123" });
 */
export function createModalRegistry(options?: ModalRegistryOptions): ModalRegistry {
  const cache = options?.hot
    ? ((options.hot.data.__deftuiModalRegistries ??= new Map<string, unknown>()) as Map<string, unknown>)
    : undefined;

  const cached = options && cache?.get(options.key);
  if (cached) return cached as ModalRegistry;

  let nextId = 0;
  let snapshot = EMPTY;
  let providerAttached = false;

  const hotDefinitions = options?.hot
    ? ((options.hot.data.__deftuiModalDefinitions ??= new Map<string, unknown>()) as Map<string, ModalDefinitionRecord>)
    : undefined;

  const roots = new Set<ModalInstance>();
  const instances = new Map<number, ModalInstance>();

  const callIds = new WeakMap<ModalHandle, number>();
  const listeners = new Set<() => void>();

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

  function getServerOpenSnapshot() {
    return false;
  }

  function createRootProps(instance: ModalInstance): ModalRootProps {
    return {
      open: instance.phase !== "closing",
      onOpenChange: (open) => {
        if (!open) instance.call.dismiss();
      },
      onOpenChangeComplete: (open) => {
        if (!open && instance.phase === "closing") removeInstance(instance);
      },
    };
  }

  function publish() {
    function build(instance: ModalInstance): ModalView {
      const children = [...instance.children].map(build);
      const open = instance.phase !== "closing";
      const existing = instance.view;

      if (
        existing &&
        existing.definition === instance.definition &&
        existing.props === instance.props &&
        existing.rootProps.open === open &&
        sameViews(existing.children, children)
      ) {
        return existing;
      }

      return (instance.view = {
        id: instance.id,
        definition: instance.definition,
        props: instance.props,
        modal: instance.modal,
        rootProps: createRootProps(instance),
        children,
      });
    }

    const next = [...roots].map(build);
    if (sameViews(snapshot, next)) return;

    snapshot = next;
    listeners.forEach((listener) => listener());
  }

  function sameViews(left: readonly ModalView[], right: readonly ModalView[]) {
    return left.length === right.length && left.every((view, index) => view === right[index]);
  }

  function removeInstance(instance: ModalInstance) {
    if (!instances.delete(instance.id)) return;

    roots.delete(instance);
    callIds.delete(instance.call);

    if (instance.parentId !== null) {
      const parent = instances.get(instance.parentId);
      parent?.children.delete(instance);
      if (parent) closeWhenReady(parent);
    }

    publish();
  }

  function settleTree(instance: ModalInstance, result: ModalResult<unknown>) {
    if (instance.phase === "active") {
      instance.phase = "waiting";
      instance.resolveResult(result);
    }

    for (const child of instance.children) {
      settleTree(child, { status: "dismissed" });
    }
  }

  function closeWhenReady(instance: ModalInstance) {
    if (instance.phase !== "waiting" || instance.children.size > 0) return;

    if (!instance.presented) {
      removeInstance(instance);
      return;
    }

    instance.phase = "closing";
  }

  function requestCloseTree(instance: ModalInstance) {
    if (instance.phase === "closing") return;

    for (const child of instance.children) requestCloseTree(child);
    closeWhenReady(instance);
  }

  function finish(instance: ModalInstance, result: ModalResult<unknown>) {
    if (instance.phase !== "active") return;

    settleTree(instance, result);
    requestCloseTree(instance);
    publish();
  }

  function onPresent(id: number, definition: ModalDefinitionRecord) {
    const instance = instances.get(id);
    if (!instance || instance.definition !== definition) return;

    instance.presented = true;
  }

  function discardInstance(instance: ModalInstance, rejection?: { error: unknown }) {
    for (const child of instance.children) discardInstance(child);
    instance.children.clear();

    instances.delete(instance.id);
    roots.delete(instance);
    callIds.delete(instance.call);

    if (instance.parentId !== null) {
      instances.get(instance.parentId)?.children.delete(instance);
    }

    if (instance.phase !== "active") return;

    instance.phase = "waiting";
    if (rejection) instance.rejectResult(rejection.error);
    else instance.resolveResult({ status: "dismissed" });
  }

  function onError(id: number, error: unknown) {
    const instance = instances.get(id);
    if (!instance) return;

    const { parentId } = instance;
    discardInstance(instance, { error });

    const parent = parentId === null ? undefined : instances.get(parentId);
    if (parent) closeWhenReady(parent);
    publish();
  }

  function clearInstances() {
    const remaining = [...instances.values()];
    instances.clear();
    roots.clear();
    publish();

    for (const instance of remaining) {
      instance.children.clear();
      if (instance.phase !== "active") continue;

      instance.phase = "waiting";
      instance.resolveResult({ status: "dismissed" });
    }
  }

  function attachProvider() {
    if (providerAttached) throw new Error("A modal registry can only have one mounted Provider.");
    providerAttached = true;

    return () => {
      providerAttached = false;

      // React Strict Mode immediately reattaches effects during its development check.
      queueMicrotask(() => {
        if (!providerAttached) clearInstances();
      });
    };
  }

  function Provider({ children }: { children?: ReactNode }) {
    const views = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    useEffect(attachProvider, []);

    return (
      <>
        {children}
        {views.map((view) => (
          <ModalEntry key={view.id} view={view} onPresent={onPresent} onError={onError} />
        ))}
      </>
    );
  }

  function define<Props extends object, Output = void>(
    root: ModalRootComponent,
    component: ComponentType<Modal<Props, Output>>,
  ): ModalDefinition<Props, Output> {
    function ModalRoot() {
      return null;
    }

    const definitionRecord: ModalDefinitionRecord = {
      root,
      component: component as unknown as ModalDefinitionRecord["component"],
    };

    const definition = Object.assign(ModalRoot, {
      show: ((props?: Props, showOptions?: ModalShowOptions) => open(definitionRecord, props, showOptions)) as ModalDefinition<
        Props,
        Output
      >["show"],
    }) as ModalDefinition<Props, Output>;

    const hotName = options?.hot ? (component.displayName ?? component.name) : undefined;
    if (hotDefinitions && hotName) {
      const hotKey = `${options?.key}:${hotName}`;
      const previous = hotDefinitions.get(hotKey);

      if (previous) {
        for (const instance of instances.values()) {
          if (instance.definition !== previous || instance.phase !== "active") continue;

          instance.definition = definitionRecord;
          instance.presented = false;
        }
      }

      hotDefinitions.set(hotKey, definitionRecord);
      publish();
    }

    return definition;
  }

  function open(
    definition: ModalDefinitionRecord,
    props: object = {},
    options?: ModalShowOptions,
  ): ModalCall<Record<string, unknown>, unknown> {
    let parentId: number | null = null;
    if (options?.parent) {
      const id = callIds.get(options.parent);
      if (id === undefined) throw new Error("The parent modal call belongs to another registry or is no longer active.");

      const parent = instances.get(id);
      if (!parent || parent.phase !== "active") throw new Error("A child call cannot be opened from a settled parent.");
      parentId = id;
    }

    const id = nextId++;
    let resolveResult!: (result: ModalResult<unknown>) => void;
    let rejectResult!: (error: unknown) => void;

    const result = new Promise<ModalResult<unknown>>((resolve, reject) => {
      resolveResult = resolve;
      rejectResult = reject;
    });

    let instance!: ModalInstance;

    const call = Object.assign(result, {
      type: "modal-call" as const,
      update: (patch: object) => {
        if (instance.phase !== "active") return;

        instance.props = { ...instance.props, ...patch };
        publish();
      },
      resolve: (value: unknown) => finish(instance, { status: "resolved", value }),
      dismiss: () => finish(instance, { status: "dismissed" }),
    });

    instance = {
      id,
      definition,
      parentId,
      children: new Set(),
      props: props as Record<string, unknown>,
      phase: "active",
      presented: false,
      resolveResult,
      rejectResult,
      call,
      modal: {
        call,
        resolve: call.resolve,
        dismiss: call.dismiss,
      },
    };

    instances.set(id, instance);
    if (parentId === null) roots.add(instance);
    else instances.get(parentId)?.children.add(instance);
    callIds.set(call, id);
    publish();
    return call;
  }

  function dismissAll() {
    for (const instance of [...roots].reverse()) {
      finish(instance, { status: "dismissed" });
    }
  }

  function isAnyModalOpen() {
    for (const instance of instances.values()) if (instance.phase !== "closing") return true;
    return false;
  }

  function useAnyModalOpen() {
    return useSyncExternalStore(subscribe, isAnyModalOpen, getServerOpenSnapshot);
  }

  const registry: ModalRegistry = { Provider, define, dismissAll, isAnyModalOpen, useAnyModalOpen };
  if (cache && options) cache.set(options.key, registry);

  return registry;
}
