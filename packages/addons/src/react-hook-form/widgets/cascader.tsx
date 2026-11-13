import type { InputControlProps, OnValueChange } from "./types";
import type { CascaderProps, CascaderSingleProps } from "@deftui/react";
import type { ComponentProps } from "react";

import { Cascader } from "@deftui/react";

/** `Omit` on the whole union collapses the `multiple` discriminant; omit per branch. */
type OmitCascader<T, K extends string | number | symbol> =
  CascaderProps<T> extends infer P ? (P extends CascaderSingleProps<T> ? Omit<P, K> : never) : never;

type Props<T> = InputControlProps &
  OmitCascader<T, "invalid" | "children" | "onValueChange"> &
  Pick<ComponentProps<typeof Cascader.Input>, "placeholder"> & {
    onChange?: OnValueChange;

    /** Class on the trigger surface, e.g. its width. */
    className?: ComponentProps<typeof Cascader.Trigger>["className"];

    /** Class on the panel surface. The panel is wider than the trigger by design. */
    popupClassName?: ComponentProps<typeof Cascader.Popup>["className"];
  };

/** One-liner drill-mode Cascader: trigger + searchable panel with breadcrumb, rendered rows and status. */
export function RHFCascader<T>(props: Props<T>) {
  const { placeholder, className, popupClassName, ...rootProps } = props;

  return (
    <Cascader<T> {...rootProps} onValueChange={rootProps.onChange} invalid={Boolean(rootProps["aria-invalid"])}>
      <Cascader.Trigger className={className}>
        <Cascader.Value placeholder={placeholder} />
      </Cascader.Trigger>

      <Cascader.Popup className={popupClassName}>
        <Cascader.Panel>
          <Cascader.Nav>
            <Cascader.Input placeholder={placeholder} />
          </Cascader.Nav>
          <Cascader.Breadcrumb />
          <Cascader.Empty />
          <Cascader.List>
            <Cascader.VirtualItems />
          </Cascader.List>
          <Cascader.Status />
        </Cascader.Panel>
      </Cascader.Popup>
    </Cascader>
  );
}
