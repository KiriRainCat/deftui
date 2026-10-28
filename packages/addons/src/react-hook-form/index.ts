import { RHFField } from "./field";
import { RHFForm } from "./form";

export const RHF = {
  /** Form with predefined `className="grid gap-4"` */
  Form: RHFForm,

  /** Form field with label, description, error, and `useController` wrapper */
  Field: RHFField,
};
