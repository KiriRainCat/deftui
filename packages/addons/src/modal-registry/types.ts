import type { ComponentType, FunctionComponent, ReactNode } from "react";

/** Props the registry injects into a Base UI Dialog, AlertDialog, Drawer, or Sheet root. */
export interface ModalRootProps {
  open: boolean;
  onOpenChange: (open: boolean, details?: unknown) => void;
  onOpenChangeComplete: (open: boolean) => void;
}

/** A Base UI root component controlled by the registry. */
export type ModalRootComponent<RootProps extends object = {}> = ComponentType<ModalRootProps & RootProps & { children?: ReactNode }>;

/** Root props the caller may override for one call. */
export type ModalRootOverrides<RootProps extends object> = Partial<Omit<RootProps, keyof ModalRootProps | "children">>;

/** Per-call controls exposed to the modal component. */
export interface ModalController<Props extends object = {}, Output = void> {
  /** The current call, suitable for `show(..., { parent: modal.call })`. */
  readonly call: ModalCall<Props, Output>;

  /** Resolve the result and start closing. The first result or dismissal wins. */
  resolve: (value: Output) => void;

  /** Dismiss normally, without rejecting the returned promise. */
  dismiss: () => void;
}

/** Props for a modal component. */
export type Modal<Props extends object = {}, Output = void> = Props & { modal: ModalController<Props, Output> };

export type ModalResult<Output> = { status: "resolved"; value: Output } | { status: "dismissed" };

/** A call handle usable as another call's `parent`. */
export type ModalHandle = { readonly type: "modal-call" };

export interface ModalCall<Props, Output> extends Promise<ModalResult<Output>>, ModalHandle {
  /** Shallow-merge new props into this call while it is still active. */
  update: (patch: Partial<Props>) => void;

  /** Resolve this call and start closing. */
  resolve: (value: Output) => void;

  /** Dismiss this call and its child calls. */
  dismiss: () => void;
}

/** A callable definition doubles as a Fast Refresh-compatible component handle. */
export type ModalDefinition<Props extends object = {}, Output = void, RootProps extends object = {}> = FunctionComponent<{}> & {
  /** Open this definition through its owning registry. */
  readonly show: ModalShow<Props, Output, RootProps>;
};

export interface ModalShowOptions<RootProps extends object = {}> {
  /** Reuse the active call with the same id for this definition. */
  id?: string;

  /** Render this call inside the parent call's root. */
  parent?: ModalHandle;

  /** Root props to shallow-merge for this call. */
  rootProps?: ModalRootOverrides<RootProps>;
}

type ModalArguments<Props> = {} extends Props ? [props?: Props] : [props: Props];

interface ModalShow<Props, Output, RootProps extends object = {}> {
  (...args: ModalArguments<Props>): ModalCall<Props, Output>;
  (props: Props, options: ModalShowOptions<RootProps>): ModalCall<Props, Output>;
}

export interface ModalRegistry {
  /** Mount once around the application. Unmounting dismisses pending calls. */
  Provider: ComponentType<{ children?: ReactNode }>;

  /** Register a modal component. The registry controls the root and injects child calls through its children. */
  define<Props extends object, Output = void, RootProps extends object = {}>(
    root: ModalRootComponent<RootProps>,
    component: ComponentType<Modal<Props, Output>>,
  ): ModalDefinition<Props, Output, RootProps>;

  /** Dismiss every active call, waiting for children to exit before their parents. */
  dismissAll: () => void;

  /** Dismiss the most recently opened active call. */
  dismissTop: () => void;

  /** Whether at least one modal root is open. Closing roots no longer count. */
  isAnyModalOpen: () => boolean;

  /** Reactive form of `isAnyModalOpen` for React components. */
  useAnyModalOpen: () => boolean;
}

export interface ModalRegistryOptions {
  /** The registration module's `import.meta.hot`. */
  hot?: { data: Record<string, unknown> };

  /** Stable across updates and unique among registries in the same module. */
  key: string;
}
