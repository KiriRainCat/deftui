import type { ComponentType } from "react";

export type ModalResult<Value> = { status: "resolved"; value: Value } | { status: "dismissed" };

/** Spread onto a controlled Dialog, AlertDialog, or Sheet root. */
export interface ModalRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangeComplete: (open: boolean) => void;
}

export interface ModalController<Value> {
  /** Spread all three props onto the Root; forward callbacks when overriding them. */
  rootProps: ModalRootProps;

  /** Resolve the result and start closing. The first resolution or dismissal wins. */
  resolve: (value: Value) => void;

  /** Dismiss normally, without rejecting the returned promise. */
  dismiss: () => void;
}

/** Intersect with the business component's props. The manager supplies `modal`. */
export interface ModalProps<Value = void> {
  modal: ModalController<Value>;
}

export type ModalRegistry = Record<string, ComponentType<never>>;

type ModalComponentProps<T extends ComponentType<never>> = T extends ComponentType<infer Props> ? Props : never;

export type ModalInput<T extends ComponentType<never>> = Omit<ModalComponentProps<T>, "modal">;

export type ModalValue<T extends ComponentType<never>> = ModalComponentProps<T> extends ModalProps<infer Value> ? Value : never;

type ModalArguments<Props> = {} extends Props ? [props?: Props] : [props: Props];

export interface ModalManager<Registry extends ModalRegistry> {
  /** Mount once inside the required contexts. Unmounting dismisses pending calls. */
  Host: ComponentType;

  /**
   * Each call creates an independent instance.
   *
   * Resolves when closing starts; unmounts after exit.
   *
   * Loading/rendering failures reject; normal dismissal resolves with `status: "dismissed"`.
   */
  open: <Key extends Extract<keyof Registry, string>>(
    key: Key,
    ...args: ModalArguments<ModalInput<Registry[Key]>>
  ) => Promise<ModalResult<ModalValue<Registry[Key]>>>;

  /** Dismiss all current instances, preserving their exit animations. */
  dismissAll: () => void;

  /** Replace definitions, retaining promises. Removed entries dismiss; new components may reset local state. */
  setRegistry: (registry: Registry) => void;
}
