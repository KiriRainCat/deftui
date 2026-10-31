import { RHFField } from "./field";
import { RHFForm } from "./form";

export const RHF = {
  /** Form with predefined `className="grid gap-4"` */
  Form: RHFForm,

  /**
   * `useController` wrapper with label, description, and error.
   *
   * - Defaults `aria-invalid` to `fieldState.invalid` on a single child element.
   * - Preserves explicit values; skips arrays and fragments.
   * - Custom components must forward the attribute.
   */
  Field: RHFField,
};
