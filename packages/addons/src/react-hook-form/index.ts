import { RHFField } from "./field";
import { RHFForm } from "./form";

export const RHF = {
  /**
   * Thin wrapper for BaseUI's FormPrimitive.
   *
   * - `className` defaults to `"grid gap-4"`.
   */
  Form: RHFForm,

  /**
   * `useController` wrapper with label, description, and error.
   *
   * - Injects `id`, `aria-invalid`, and `aria-describedby` into a single child element.
   * - For arrays/fragments, spread the second callback argument onto the control.
   * - Syncs `data-disabled` with the field's disabled state.
   * - Custom components must forward these props.
   */
  Field: RHFField,
};
