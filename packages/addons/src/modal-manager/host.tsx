"use client";

import type { ModalProps } from "./types";
import type { ComponentType, ReactNode } from "react";

import { Component, memo, Suspense, useLayoutEffect } from "react";

export interface ModalView {
  id: number;
  component: ComponentType<ModalProps<unknown>>;
  props: object;
  modal: ModalProps<unknown>["modal"];
}

interface ModalRendererProps {
  view: ModalView;
  onPresent: (id: number, component: ModalView["component"]) => void;
}

function ModalRenderer({ view, onPresent }: ModalRendererProps) {
  // This effect commits only after a lazy component has finished suspending.
  useLayoutEffect(() => onPresent(view.id, view.component), [onPresent, view.id, view.component]);

  const Content = view.component;
  return <Content {...view.props} modal={view.modal} />;
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

/** Unchanged instances do not rerender when another instance opens or closes. */
export const ModalEntry = memo(function ModalEntry({
  view,
  onPresent,
  onError,
}: ModalRendererProps & { onError: (id: number, error: unknown) => void }) {
  return (
    <ModalErrorBoundary onError={(error) => onError(view.id, error)}>
      <Suspense fallback={null}>
        <ModalRenderer view={view} onPresent={onPresent} />
      </Suspense>
    </ModalErrorBoundary>
  );
});
