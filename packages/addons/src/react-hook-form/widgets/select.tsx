import type { OnValueChange, Options } from "./types";
import type { ComponentProps } from "react";

import { Select } from "@deftui/react";

// oxfmt-ignore
type Props<V extends string> = { options: Options<V>, onChange?: OnValueChange } &
  Omit<ComponentProps<typeof Select>, "items" | "children"> &
  Pick<ComponentProps<typeof Select.Trigger>, "size" | "className"> &
  Pick<ComponentProps<typeof Select.Value>, "placeholder" | "className">;

export function RHFSelect<V extends string>(props: Props<V>) {
  const { options, size, placeholder, className, ...rootProps } = props;

  return (
    <Select {...rootProps} onValueChange={rootProps.onChange} items={options}>
      <Select.Trigger size={size} className={className}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
