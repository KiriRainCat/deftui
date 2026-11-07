import { RHFField } from "./field";
import { RHFForm } from "./form";
import { RHFCombobox } from "./widgets/combobox";
import { RHFSelect } from "./widgets/select";

export const RHF = {
  /** A Base UI form with a default grid layout; submission stays controlled by the caller. */
  Form: RHFForm,

  /** Wraps `useController` with label, description, error, and control-prop forwarding. */
  Field: RHFField,

  /** One-liner component for Select, used under {@link RHF.Field}. */
  Select: RHFSelect,

  /** One-liner component for Combobox, used under {@link RHF.Field}. */
  Combobox: RHFCombobox,
};
