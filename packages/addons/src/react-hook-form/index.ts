import { RHFField } from "./field";
import { RHFForm } from "./form";

export const RHF = {
  /** A Base UI form with a default grid layout; submission stays controlled by the caller. */
  Form: RHFForm,

  /** Wraps `useController` with label, description, error, and control-prop forwarding. */
  Field: RHFField,
};
