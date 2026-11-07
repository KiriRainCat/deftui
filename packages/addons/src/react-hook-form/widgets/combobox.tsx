import type { OnValueChange, Options } from "./types";
import type { ComponentProps } from "react";

import { Combobox } from "@deftui/react";

// oxfmt-ignore
type Props<V extends string> = { options: Options<V>; emptyLabel?: string; onChange?: OnValueChange } &
  Omit<ComponentProps<typeof Combobox>, "items" | "children"> &
  Pick<ComponentProps<typeof Combobox.Input>, "size" | "placeholder" | "showClear" | "className">;

export function RHFCombobox<V extends string>(props: Props<V>) {
  const { options, size, placeholder, showClear, className, emptyLabel, ...rootProps } = props;

  return (
    <Combobox {...rootProps} onValueChange={rootProps.onChange} items={options}>
      <Combobox.Input size={size} placeholder={placeholder} showClear={showClear} className={className} />

      <Combobox.Content>
        <Combobox.Empty>{emptyLabel}</Combobox.Empty>

        <Combobox.List>
          {options.map((option) => (
            <Combobox.Item key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
}
