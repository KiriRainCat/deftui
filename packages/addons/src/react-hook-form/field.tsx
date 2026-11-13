import type { InputControlProps } from "./widgets/types";
import type React from "react";
import type { FieldPath, FieldValues, UseControllerProps, UseControllerReturn } from "react-hook-form";

import { Field } from "@deftui/react";
import { cloneElement, Fragment, isValidElement, useId } from "react";
import { useController } from "react-hook-form";

interface RHFFieldProps<
  Values extends FieldValues,
  Name extends FieldPath<Values> = FieldPath<Values>,
  Output = Values,
> extends UseControllerProps<Values, Name, Output> {
  /** Label associated with the control's ID. */
  label?: React.ReactNode;

  /** Supporting text referenced by the control's aria-describedby. */
  description?: React.ReactNode;

  /**
   * Associates the label with the control's ID via htmlFor.
   *
   * @default false
   */
  associateLabel?: boolean;

  /**
   * Injects id, aria-invalid, and aria-describedby into a single non-Fragment element returned by children.
   *
   * Set to false for wrapper elements or when binding `controlProps` to an inner control manually.
   *
   * @default true
   */
  injectControlProps?: boolean;

  /** Callback with `useController` states and `controllerProps` for rendering JSX. */
  children: (state: UseControllerReturn<Values, Name>, controlProps: InputControlProps) => React.ReactNode;
  className?: string;
}

export function RHFField<T extends FieldValues, Name extends FieldPath<T>, Output = T>(props: RHFFieldProps<T, Name, Output>) {
  const { label, description, associateLabel = false, injectControlProps = true, className, children, ...controllerProps } = props;

  const id = useId();
  const controller = useController(controllerProps);
  const hasError = Boolean(controller.fieldState.error?.message);

  const controlProps: InputControlProps = {
    id,
    "aria-invalid": controller.fieldState.invalid,
    "aria-describedby": [description != null && `${id}-description`, hasError && `${id}-error`].filter(Boolean).join(" ") || undefined,
  };

  const child = children(controller, controlProps);
  const control = injectControlProps && isValidElement<React.HTMLAttributes<HTMLElement>>(child) && child.type !== Fragment ? child : null;
  const controlId = control?.props.id ?? id;

  const descriptionIds = [control?.props["aria-describedby"], controlProps["aria-describedby"]].join(" ").split(/\s+/).filter(Boolean);
  const describedBy = [...new Set(descriptionIds)].join(" ") || undefined;

  return (
    <Field data-invalid={controller.fieldState.invalid} data-disabled={controller.field.disabled} className={className}>
      {label != null && <Field.Label htmlFor={associateLabel ? controlId : undefined}>{label}</Field.Label>}

      {control
        ? cloneElement(control, {
            "id": controlId,
            "aria-invalid": control.props["aria-invalid"] ?? controlProps["aria-invalid"],
            "aria-describedby": describedBy,
          })
        : child}

      {description != null && <Field.Description id={`${id}-description`}>{description}</Field.Description>}
      {hasError && <Field.Error id={`${id}-error`} errors={[controller.fieldState.error]} />}
    </Field>
  );
}
