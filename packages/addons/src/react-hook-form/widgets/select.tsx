import type { InputControlProps, OnValueChange, Options } from "./types";
import type { ComponentProps } from "react";

import { Select } from "@deftui/react";

type Props<V extends string> = InputControlProps &
  Omit<ComponentProps<typeof Select>, "items" | "children" | "onValueChange"> &
  Pick<ComponentProps<typeof Select.Trigger>, "size" | "className"> &
  Pick<ComponentProps<typeof Select.Value>, "placeholder"> & {
    options: Options<V>;
    onChange?: OnValueChange;
  };

export function RHFSelect<V extends string>(props: Props<V>) {
  const { options, size, placeholder, className, ...rootProps } = props;

  return (
    <Select {...rootProps} onValueChange={rootProps.onChange} items={options}>
      <Select.Trigger
        size={size}
        className={className}
        aria-invalid={rootProps["aria-invalid"]}
        aria-describedby={rootProps["aria-describedby"]}
      >
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Select.Popup>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Popup>
    </Select>
  );
}
