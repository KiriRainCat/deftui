import * as AlertDialogUI from "@/vendor/coss/alert-dialog";
import * as CardUI from "@/vendor/coss/card";
import * as DialogUI from "@/vendor/coss/dialog";
import * as DrawerUI from "@/vendor/coss/drawer";
import * as EmptyUI from "@/vendor/coss/empty";
import * as TableUI from "@/vendor/coss/table";
import * as CascaderUI from "@/vendor/reui.io/cascader/cascader";
import * as CascaderFooterUI from "@/vendor/reui.io/cascader/cascader-footer";
import * as CascaderItemUI from "@/vendor/reui.io/cascader/cascader-item";
import * as CascaderNavUI from "@/vendor/reui.io/cascader/cascader-nav";
import * as CascaderVirtualUI from "@/vendor/reui.io/cascader/cascader-virtual";
import * as BreadcrumbUI from "@/vendor/shadcn/breadcrumb";
import * as ButtonGroupUI from "@/vendor/shadcn/button-group";
import * as ComboboxUI from "@/vendor/shadcn/combobox";
import * as DropdownUI from "@/vendor/shadcn/dropdown-menu";
import * as FieldUI from "@/vendor/shadcn/field";
import * as InputGroupUI from "@/vendor/shadcn/input-group";
import * as KbdUI from "@/vendor/shadcn/kbd";
import * as PopoverUI from "@/vendor/shadcn/popover";
import * as ProgressUI from "@/vendor/shadcn/progress";
import * as RadioUI from "@/vendor/shadcn/radio-group";
import * as SelectUI from "@/vendor/shadcn/select";
import * as TabsUI from "@/vendor/shadcn/tabs";
import * as TooltipUI from "@/vendor/shadcn/tooltip";

export * from "./toast";
export * from "./sidebar";
export * from "./datetime";
export * from "./dropzone";
export * from "./multimedia";
export * from "./pagination";

export { Label } from "@/vendor/shadcn/label";
export { Input } from "@/vendor/shadcn/input";
export { Badge } from "@/vendor/shadcn/badge";
export { Button } from "@/vendor/shadcn/button";
export { Switch } from "@/vendor/shadcn/switch";
export { Spinner } from "@/vendor/shadcn/spinner";
export { Skeleton } from "@/vendor/shadcn/skeleton";
export { Checkbox } from "@/vendor/shadcn/checkbox";
export { Textarea } from "@/vendor/shadcn/textarea";
export { Separator } from "@/vendor/shadcn/separator";

export { Form } from "@/vendor/coss/form";
export { Calendar } from "@/vendor/coss/calendar";
export { ScrollArea } from "@/vendor/coss/scroll-area";

export { IconSwap } from "@/vendor/tailored/icon-swap";
export { JsonViewer } from "@/vendor/tailored/json-viewer";

/** https://ui.shadcn.com/docs/components/base/kbd */
export const Kbd = /* @__PURE__ */ Object.assign(KbdUI.Kbd, {
  Group: KbdUI.KbdGroup,
});

/** https://ui.shadcn.com/docs/components/base/tabs */
export const Tabs = /* @__PURE__ */ Object.assign(TabsUI.Tabs, {
  List: TabsUI.TabsList,
  Trigger: TabsUI.TabsTrigger,

  Content: TabsUI.TabsContent,
});

/** https://coss.com/ui/docs/components/card */
export const Card = /* @__PURE__ */ Object.assign(CardUI.Card, {
  Header: CardUI.CardHeader,
  Panel: CardUI.CardPanel,
  Footer: CardUI.CardFooter,

  Title: CardUI.CardTitle,
  Action: CardUI.CardAction,
  Description: CardUI.CardDescription,
});

/** https://coss.com/ui/docs/components/card#cardframe */
export const Frame = /* @__PURE__ */ Object.assign(CardUI.CardFrame, {
  Header: CardUI.CardFrameHeader,
  Footer: CardUI.CardFrameFooter,

  Title: CardUI.CardFrameTitle,
  Description: CardUI.CardFrameDescription,
  Action: CardUI.CardFrameAction,
});

/** https://ui.shadcn.com/docs/components/base/field */
export const Field = /* @__PURE__ */ Object.assign(FieldUI.Field, {
  Label: FieldUI.FieldLabel,
  Description: FieldUI.FieldDescription,
  Error: FieldUI.FieldError,
});

/** https://coss.com/ui/docs/components/empty */
export const Empty = /* @__PURE__ */ Object.assign(EmptyUI.Empty, {
  Header: EmptyUI.EmptyHeader,
  Content: EmptyUI.EmptyContent,

  Media: EmptyUI.EmptyMedia,
  Title: EmptyUI.EmptyTitle,
  Description: EmptyUI.EmptyDescription,
});

/** https://coss.com/ui/docs/components/table */
export const Table = /* @__PURE__ */ Object.assign(TableUI.Table, {
  Header: TableUI.TableHeader,
  Body: TableUI.TableBody,
  Footer: TableUI.TableFooter,
  Caption: TableUI.TableCaption,

  Row: TableUI.TableRow,
  Head: TableUI.TableHead,
  Cell: TableUI.TableCell,
});

/** https://ui.shadcn.com/docs/components/base/radio-group */
export const Radio = /* @__PURE__ */ Object.assign(RadioUI.RadioGroupItem, {
  Group: RadioUI.RadioGroup,
});

/** https://ui.shadcn.com/docs/components/base/select */
export const Select = /* @__PURE__ */ Object.assign(SelectUI.Select, {
  Trigger: SelectUI.SelectTrigger,
  Value: SelectUI.SelectValue,

  Content: SelectUI.SelectContent,
  Separator: SelectUI.SelectSeparator,

  Group: SelectUI.SelectGroup,
  Label: SelectUI.SelectLabel,
  Item: SelectUI.SelectItem,
});

/** https://coss.com/ui/docs/components/drawer */
export const Drawer = /* @__PURE__ */ Object.assign(DrawerUI.Drawer, {
  Trigger: DrawerUI.DrawerTrigger,

  Close: DrawerUI.DrawerClose,
  Popup: DrawerUI.DrawerPopup,

  Header: DrawerUI.DrawerHeader,
  Panel: DrawerUI.DrawerPanel,
  Footer: DrawerUI.DrawerFooter,

  Title: DrawerUI.DrawerTitle,
  Description: DrawerUI.DrawerDescription,
});

/** https://coss.com/ui/docs/components/dialog */
export const Dialog = /* @__PURE__ */ Object.assign(DialogUI.Dialog, {
  Trigger: DialogUI.DialogTrigger,

  Close: DialogUI.DialogClose,
  Popup: DialogUI.DialogPopup,

  Header: DialogUI.DialogHeader,
  Panel: DialogUI.DialogPanel,
  Footer: DialogUI.DialogFooter,

  Title: DialogUI.DialogTitle,
  Description: DialogUI.DialogDescription,
});

/** https://ui.shadcn.com/docs/components/base/tooltip */
export const Tooltip = /* @__PURE__ */ Object.assign(TooltipUI.Tooltip, {
  Provider: TooltipUI.TooltipProvider,

  Trigger: TooltipUI.TooltipTrigger,
  Content: TooltipUI.TooltipContent,
});

/** https://ui.shadcn.com/docs/components/base/popover */
export const Popover = /* @__PURE__ */ Object.assign(PopoverUI.Popover, {
  Trigger: PopoverUI.PopoverTrigger,

  Content: PopoverUI.PopoverContent,

  Title: PopoverUI.PopoverTitle,
  Description: PopoverUI.PopoverDescription,
});

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

/** https://ui.shadcn.com/docs/components/base/dropdown-menu */
export const Dropdown = /* @__PURE__ */ Object.assign(DropdownUI.DropdownMenu, {
  Trigger: DropdownUI.DropdownMenuTrigger,

  Content: DropdownUI.DropdownMenuContent,

  Sub: DropdownUI.DropdownMenuSub,
  SubTrigger: DropdownUI.DropdownMenuSubTrigger,
  SubContent: DropdownUI.DropdownMenuSubContent,

  Group: DropdownUI.DropdownMenuGroup,
  GroupLabel: DropdownUI.DropdownMenuLabel,
  Separator: DropdownUI.DropdownMenuSeparator,

  Item: DropdownUI.DropdownMenuItem,
  Shortcut: DropdownUI.DropdownMenuShortcut,

  RadioItem: DropdownUI.DropdownMenuRadioItem,
  RadioGroup: DropdownUI.DropdownMenuRadioGroup,

  CheckboxItem: DropdownUI.DropdownMenuCheckboxItem,
});

/** https://ui.shadcn.com/docs/components/base/combobox */
export const Combobox = /* @__PURE__ */ Object.assign(ComboboxUI.Combobox, {
  Content: ComboboxUI.ComboboxContent,
  Empty: ComboboxUI.ComboboxEmpty,
  List: ComboboxUI.ComboboxList,

  Input: ComboboxUI.ComboboxInput,
  ChipsInput: ComboboxUI.ComboboxChipsInput,

  Chips: ComboboxUI.ComboboxChips,
  Value: ComboboxUI.ComboboxValue,
  Chip: ComboboxUI.ComboboxChip,

  Group: ComboboxUI.ComboboxGroup,
  GroupLabel: ComboboxUI.ComboboxLabel,
  GroupCollection: ComboboxUI.ComboboxCollection,

  Item: ComboboxUI.ComboboxItem,
  Separator: ComboboxUI.ComboboxSeparator,
});

/** https://ui.shadcn.com/docs/components/base/progress */
export const Progress = /* @__PURE__ */ Object.assign(ProgressUI.Progress, {
  Label: ProgressUI.ProgressLabel,
  Value: ProgressUI.ProgressValue,

  Track: ProgressUI.ProgressTrack,
  Indicator: ProgressUI.ProgressIndicator,
});

/** https://ui.shadcn.com/docs/components/base/breadcrumb */
export const Breadcrumb = /* @__PURE__ */ Object.assign(BreadcrumbUI.Breadcrumb, {
  List: BreadcrumbUI.BreadcrumbList,

  Item: BreadcrumbUI.BreadcrumbItem,
  Separator: BreadcrumbUI.BreadcrumbSeparator,

  Link: BreadcrumbUI.BreadcrumbLink,
  Ellipsis: BreadcrumbUI.BreadcrumbEllipsis,
  Page: BreadcrumbUI.BreadcrumbPage,
});

/** https://coss.com/ui/docs/components/alert-dialog */
export const AlertDialog = /* @__PURE__ */ Object.assign(AlertDialogUI.AlertDialog, {
  Trigger: AlertDialogUI.AlertDialogTrigger,

  Close: AlertDialogUI.AlertDialogClose,
  Popup: AlertDialogUI.AlertDialogPopup,

  Header: AlertDialogUI.AlertDialogHeader,
  Footer: AlertDialogUI.AlertDialogFooter,

  Title: AlertDialogUI.AlertDialogTitle,
  Description: AlertDialogUI.AlertDialogDescription,
});

/** https://ui.shadcn.com/docs/components/base/button-group */
export const ButtonGroup = /* @__PURE__ */ Object.assign(ButtonGroupUI.ButtonGroup, {
  Text: ButtonGroupUI.ButtonGroupText,
  Separator: ButtonGroupUI.ButtonGroupSeparator,
});

/** https://ui.shadcn.com/docs/components/base/input-group */
export const InputGroup = /* @__PURE__ */ Object.assign(InputGroupUI.InputGroup, {
  Addon: InputGroupUI.InputGroupAddon,
  AddonText: InputGroupUI.InputGroupText,

  Input: InputGroupUI.InputGroupInput,
  Textarea: InputGroupUI.InputGroupTextarea,
  Button: InputGroupUI.InputGroupButton,
});
