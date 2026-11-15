import * as CascaderUI from "@/vendor/reui.io/cascader/cascader";
import * as CascaderFooterUI from "@/vendor/reui.io/cascader/cascader-footer";
import * as CascaderItemUI from "@/vendor/reui.io/cascader/cascader-item";
import * as CascaderNavUI from "@/vendor/reui.io/cascader/cascader-nav";
import * as CascaderVirtualUI from "@/vendor/reui.io/cascader/cascader-virtual";

export type { CascaderItemState } from "@/vendor/reui.io/cascader/cascader-context";
export type { CascaderSingleProps, CascaderProps } from "@/vendor/reui.io/cascader/cascader";
export type { CascaderChangeDetails, CascaderLabels, CascaderMode, CascaderNode } from "@/vendor/reui.io/cascader/cascader-types";

export { useCascaderState, useCascaderActions, useCascaderSelection } from "@/vendor/reui.io/cascader/cascader";

/** https://reui.io/docs/components/cascader */
export const Cascader = /* @__PURE__ */ Object.assign(CascaderUI.Cascader, {
  Trigger: CascaderUI.CascaderTrigger,
  Popup: CascaderUI.CascaderContent,

  Panel: CascaderUI.CascaderPanel,
  List: CascaderUI.CascaderList,
  Empty: CascaderUI.CascaderEmpty,
  Status: CascaderUI.CascaderStatus,

  Chips: CascaderUI.CascaderChips,
  Chip: CascaderUI.CascaderChip,

  Nav: CascaderNavUI.CascaderNav,
  Back: CascaderNavUI.CascaderBack,
  Breadcrumb: CascaderNavUI.CascaderBreadcrumb,
  Input: CascaderNavUI.CascaderInput,
  Value: CascaderNavUI.CascaderValue,

  Item: CascaderItemUI.CascaderItem,
  Items: CascaderItemUI.CascaderItems,
  Group: CascaderItemUI.CascaderGroup,
  Label: CascaderItemUI.CascaderLabel,
  Separator: CascaderItemUI.CascaderSeparator,

  Footer: CascaderFooterUI.CascaderFooter,
  Action: CascaderFooterUI.CascaderAction,
  Submenu: CascaderFooterUI.CascaderSubmenu,
  SubmenuTrigger: CascaderFooterUI.CascaderSubmenuTrigger,
  SubmenuContent: CascaderFooterUI.CascaderSubmenuContent,

  /** Windowed replacement for `Items` inside `List`. */
  VirtualItems: CascaderVirtualUI.CascaderVirtualItems,
});
