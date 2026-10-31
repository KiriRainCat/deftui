import type React from "react";
import type { FieldPath, FieldValues, UseControllerProps, UseControllerReturn } from "react-hook-form";

import { Field } from "@deftui/react";
import { cloneElement, Fragment, isValidElement } from "react";
import { useController } from "react-hook-form";

type FieldStateKeys = "name" | "disabled" | "invalid" | "dirty" | "touched";
type FieldValidKeys = "validate" | "validationMode" | "validationDebounceTime";
type FieldRootProps = Omit<React.ComponentProps<typeof Field>, FieldStateKeys | FieldValidKeys | "children">;

interface RHFFieldProps<
  Values extends FieldValues,
  Name extends FieldPath<Values> = FieldPath<Values>,
  Output = Values,
> extends UseControllerProps<Values, Name, Output> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  fieldProps?: FieldRootProps;

  /** A single non-fragment element receives `aria-invalid` unless explicitly provided. */
  children: (state: UseControllerReturn<Values, Name>) => React.ReactNode;
}

export function RHFField<T extends FieldValues, Name extends FieldPath<T>, Output = T>(props: RHFFieldProps<T, Name, Output>) {
  const { label, description, fieldProps, children, ...controllerProps } = props;

  const controller = useController(controllerProps);
  const child = children(controller);

  return (
    <Field {...fieldProps} data-invalid={controller.fieldState.invalid}>
      {label != null && <Field.Label>{label}</Field.Label>}

      {isValidElement<React.AriaAttributes>(child) && child.type !== Fragment
        ? cloneElement(child, { "aria-invalid": child.props["aria-invalid"] ?? controller.fieldState.invalid })
        : child}

      {description != null && <Field.Description>{description}</Field.Description>}
      {controller.fieldState.invalid && <Field.Error errors={[controller.fieldState.error]} />}
    </Field>
  );
}
