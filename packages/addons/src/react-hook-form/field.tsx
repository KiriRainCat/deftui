import type React from "react";
import type { FieldPath, FieldValues, UseControllerProps, UseControllerReturn } from "react-hook-form";

import { Field } from "@deftui/react";
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
  children: (state: UseControllerReturn<Values, Name>) => React.ReactNode;
}

export function RHFField<T extends FieldValues, Name extends FieldPath<T>, Output = T>(props: RHFFieldProps<T, Name, Output>) {
  const { label, description, fieldProps, children, ...controllerProps } = props;

  const controller = useController(controllerProps);
  const { fieldState } = controller;

  return (
    <Field {...fieldProps} data-invalid={fieldState.invalid}>
      {label != null && <Field.Label>{label}</Field.Label>}

      {children(controller)}

      {description != null && <Field.Description>{description}</Field.Description>}
      {fieldState.invalid && <Field.Error errors={[fieldState.error]} />}
    </Field>
  );
}
