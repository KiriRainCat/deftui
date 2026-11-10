import type { Modal, ModalController, ModalRootComponent, ModalRootProps } from "./types";
import type { ComponentType, ReactNode } from "react";

import { Component, memo, Suspense, useLayoutEffect } from "react";

export interface ModalDefinitionRecord {
  readonly root: ModalRootComponent;
  readonly component: ComponentType<Modal<Record<string, unknown>, unknown>>;
}

export interface ModalView {
  id: number;
  definition: ModalDefinitionRecord;
  props: Record<string, unknown>;
  modal: ModalController<Record<string, unknown>, unknown>;
  rootProps: ModalRootProps;
  rootConfig: Record<string, unknown>;
  children: readonly ModalView[];
}

interface ModalRendererProps {
  view: ModalView;
  onPresent: (id: number, definition: ModalDefinitionRecord) => void;
  onError: (id: number, error: unknown) => void;
}

function ModalRenderer({ view, onPresent, onError }: ModalRendererProps) {
  // This effect commits only after a lazy component has finished suspending.
  useLayoutEffect(() => onPresent(view.id, view.definition), [onPresent, view.id, view.definition]);

  const outlet: ReactNode =
    view.children.length > 0
      ? view.children.map((child) => <ModalEntry key={child.id} view={child} onPresent={onPresent} onError={onError} />)
      : null;

  const { root: Root, component: Content } = view.definition;

  return (
    <Root {...view.rootConfig} {...view.rootProps}>
      <Content {...view.props} modal={view.modal} />
      {outlet}
    </Root>
  );
}

class ModalErrorBoundary extends Component<{ children: ReactNode; onError: (error: unknown) => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Unchanged calls keep their component instance when a sibling opens or closes. */
export const ModalEntry = memo(function ModalEntry({ view, onPresent, onError }: ModalRendererProps) {
  return (
    <ModalErrorBoundary onError={(error) => onError(view.id, error)}>
      <Suspense fallback={null}>
        <ModalRenderer view={view} onPresent={onPresent} onError={onError} />
      </Suspense>
    </ModalErrorBoundary>
  );
});
