import type { ModalDefinitionRecord } from "./provider";
import type { ModalRegistry } from "./types";

/** The `import.meta.hot` shape used for Fast Refresh identity. */
export type HMRContext = { data: Record<string, unknown> };

/** define() bound to one module's HMR context. */
export type ModalDefine = ModalRegistry["define"];

/** Fast Refresh identity for define() calls. */
export interface HMRIdentity {
  /** Register a define() result; return the previous record whose instances should hot-swap. */
  register: (component: { displayName?: string; name?: string }, record: ModalDefinitionRecord) => ModalDefinitionRecord | undefined;
}

/**
 * Module-scope identity: the call site's position in its module. Slots persist on
 * hot.data; re-creating the identity per module evaluation resets the cursor so slots
 * rebuild in source order.
 */
export function moduleIdentity(hot: HMRContext | undefined, key: string | undefined): HMRIdentity {
  // Production has no HMR context; a throwaway store is equivalent since nothing re-evaluates.
  const data = hot?.data ?? {};
  const slots = (data[`__deftuiModalSlots:${key}`] ??= []) as { record: ModalDefinitionRecord; name: string | undefined }[];
  let cursor = 0;

  return {
    register(component, record) {
      const name = component.displayName ?? component.name;
      const previous = slots[cursor];
      slots[cursor++] = { record, name };

      // A changed name means reshuffled call sites; degrade once, self-heal next update.
      return previous?.name === name ? previous.record : undefined;
    },
  };
}

/**
 * Registry-scope identity: the component name, unique across the registry. The same
 * name defined twice within one evaluation window is same-named components, not a hot
 * update; such names are poisoned permanently.
 */
export function nameIdentity(): HMRIdentity {
  const slots = new Map<string, ModalDefinitionRecord>();
  const poisoned = new Set<string>();
  let windowSeen: Set<string> | undefined;

  return {
    register(component, record) {
      const name = component.displayName ?? component.name;
      if (!name) return;

      // A module evaluation is synchronous; reset the window on the next microtask.
      if (!windowSeen) {
        windowSeen = new Set();
        queueMicrotask(() => (windowSeen = undefined));
      }

      const clash = windowSeen.has(name);
      windowSeen.add(name);

      const previous = slots.get(name);
      if (clash && previous) {
        poisoned.add(name);

        console.warn(
          `[modal-registry] Multiple define() calls use the component name "${name}". ` +
            "Hot swapping for this name is disabled to avoid cross-wiring open modals; " +
            "rename the components, or use registry.module() so each module gets its own identity.",
        );
      }

      slots.set(name, record);
      return !clash && previous && !poisoned.has(name) ? previous : undefined;
    },
  };
}
