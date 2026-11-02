import type React from "react";
import type { FieldPath, FieldValues, UseControllerProps, UseControllerReturn } from "react-hook-form";

import { Field } from "@deftui/react";
import { cloneElement, Fragment, isValidElement, useId } from "react";
import { useController } from "react-hook-form";

interface ControlProps {
  "id": string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
}

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
   * Injects id, aria-invalid, and aria-describedby into a single non-Fragment element returned by children.
   *
   * Set to false for wrapper elements or when binding `controlProps` to an inner control manually.
   *
   * @default true
   */
  injectControlProps?: boolean;

  /** Callback with `useController` states and `controllerProps` for rendering JSX. */
  children: (state: UseControllerReturn<Values, Name>, controlProps: ControlProps) => React.ReactNode;
}

export function RHFField<T extends FieldValues, Name extends FieldPath<T>, Output = T>(props: RHFFieldProps<T, Name, Output>) {
  const { label, description, injectControlProps = true, children, ...controllerProps } = props;

  const id = useId();
  const controller = useController(controllerProps);
  const hasError = Boolean(controller.fieldState.error?.message);

  const controlProps: ControlProps = {
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
    <Field data-invalid={controller.fieldState.invalid} data-disabled={controller.field.disabled}>
      {label != null && <Field.Label htmlFor={controlId}>{label}</Field.Label>}

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
