import * as AlertDialogUI from "@/vendor/shadcn/alert-dialog";
import * as CardUI from "@/vendor/shadcn/card";
import * as ComboboxUI from "@/vendor/shadcn/combobox";
import * as DialogUI from "@/vendor/shadcn/dialog";
import * as DrawerUI from "@/vendor/shadcn/drawer";
import * as DropdownUI from "@/vendor/shadcn/dropdown-menu";
import * as EmptyUI from "@/vendor/shadcn/empty";
import * as FieldUI from "@/vendor/shadcn/field";
import * as InputGroupUI from "@/vendor/shadcn/input-group";
import * as KbdUI from "@/vendor/shadcn/kbd";
import * as PopoverUI from "@/vendor/shadcn/popover";
import * as ProgressUI from "@/vendor/shadcn/progress";
import * as RadioUI from "@/vendor/shadcn/radio-group";
import * as SelectUI from "@/vendor/shadcn/select";
import * as TableUI from "@/vendor/shadcn/table";
import * as TabsUI from "@/vendor/shadcn/tabs";
import * as TooltipUI from "@/vendor/shadcn/tooltip";

export * from "./toast";
export * from "./sidebar";
export * from "./breadcrumb";
export * from "./pagination";
export * from "./image-display";
export * from "./datetime-picker";

export { Form } from "@/vendor/coss/form";

export { Label } from "@/vendor/shadcn/label";
export { Input } from "@/vendor/shadcn/input";
export { Badge } from "@/vendor/shadcn/badge";
export { Button } from "@/vendor/shadcn/button";
export { Switch } from "@/vendor/shadcn/switch";
export { Spinner } from "@/vendor/shadcn/spinner";
export { Textarea } from "@/vendor/shadcn/textarea";
export { Separator } from "@/vendor/shadcn/separator";
export { ScrollArea } from "@/vendor/coss/scroll-area";

// # [Skelton, Sheet] are not re-exported due to their limited use case.

export const Kbd = Object.assign(KbdUI.Kbd, {
  Root: KbdUI.Kbd,
  Group: KbdUI.KbdGroup,
});

export const Tabs = Object.assign(TabsUI.Tabs, {
  Root: TabsUI.Tabs,

  List: TabsUI.TabsList,
  Trigger: TabsUI.TabsTrigger,

  Content: TabsUI.TabsContent,
});

export const Card = Object.assign(CardUI.Card, {
  Root: CardUI.Card,

  Header: CardUI.CardHeader,
  Content: CardUI.CardContent,
  Footer: CardUI.CardFooter,

  Title: CardUI.CardTitle,
  Action: CardUI.CardAction,
  Description: CardUI.CardDescription,
});

export const Field = Object.assign(FieldUI.Field, {
  Root: FieldUI.Field,

  Label: FieldUI.FieldLabel,
  Description: FieldUI.FieldDescription,
  Error: FieldUI.FieldError,
});

export const Empty = Object.assign(EmptyUI.Empty, {
  Root: EmptyUI.Empty,

  Header: EmptyUI.EmptyHeader,
  Content: EmptyUI.EmptyContent,

  Media: EmptyUI.EmptyMedia,
  Title: EmptyUI.EmptyTitle,
  Description: EmptyUI.EmptyDescription,
});

export const Table = Object.assign(TableUI.Table, {
  Root: TableUI.Table,

  Header: TableUI.TableHeader,
  Body: TableUI.TableBody,
  Footer: TableUI.TableFooter,

  Row: TableUI.TableRow,
  Head: TableUI.TableHead,
  Cell: TableUI.TableCell,
});

export const Radio = Object.assign(RadioUI.RadioGroupItem, {
  Root: RadioUI.RadioGroupItem,
  Group: RadioUI.RadioGroup,
});

export const Select = Object.assign(SelectUI.Select, {
  Root: SelectUI.Select,

  Trigger: SelectUI.SelectTrigger,
  Value: SelectUI.SelectValue,

  Content: SelectUI.SelectContent,
  Separator: SelectUI.SelectSeparator,

  Group: SelectUI.SelectGroup,
  Label: SelectUI.SelectLabel,
  Item: SelectUI.SelectItem,
});

export const Drawer = Object.assign(DrawerUI.Drawer, {
  Root: DrawerUI.Drawer,
  Trigger: DrawerUI.DrawerTrigger,

  Close: DrawerUI.DrawerClose,
  Content: DrawerUI.DrawerContent,

  Header: DrawerUI.DrawerHeader,
  Footer: DrawerUI.DrawerFooter,

  Title: DrawerUI.DrawerTitle,
  Description: DrawerUI.DrawerDescription,

  Handle: DrawerUI.DrawerPrimitive.Handle,
  createHandle: DrawerUI.DrawerPrimitive.createHandle,
});

export const Dialog = Object.assign(DialogUI.Dialog, {
  Root: DialogUI.Dialog,
  Trigger: DialogUI.DialogTrigger,

  Close: DialogUI.DialogClose,
  Content: DialogUI.DialogContent,

  Header: DialogUI.DialogHeader,
  Footer: DialogUI.DialogFooter,

  Title: DialogUI.DialogTitle,
  Description: DialogUI.DialogDescription,

  Handle: DialogUI.DialogPrimitive.Handle,
  createHandle: DialogUI.DialogPrimitive.createHandle,
});

export const Tooltip = Object.assign(TooltipUI.Tooltip, {
  Root: TooltipUI.Tooltip,
  Trigger: TooltipUI.TooltipTrigger,
  Content: TooltipUI.TooltipContent,
});

export const Popover = Object.assign(PopoverUI.Popover, {
  Root: PopoverUI.Popover,
  Trigger: PopoverUI.PopoverTrigger,

  Content: PopoverUI.PopoverContent,

  Title: PopoverUI.PopoverTitle,
  Description: PopoverUI.PopoverDescription,
});

export const Dropdown = Object.assign(DropdownUI.DropdownMenu, {
  Root: DropdownUI.DropdownMenu,
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

export const Progress = Object.assign(ProgressUI.Progress, {
  Root: ProgressUI.Progress,

  Label: ProgressUI.ProgressLabel,
  Value: ProgressUI.ProgressValue,

  Track: ProgressUI.ProgressTrack,
  Indicator: ProgressUI.ProgressIndicator,
});

export const AlertDialog = Object.assign(AlertDialogUI.AlertDialog, {
  Root: AlertDialogUI.AlertDialog,
  Trigger: AlertDialogUI.AlertDialogTrigger,

  Close: AlertDialogUI.AlertDialogCancel,
  Content: AlertDialogUI.AlertDialogContent,

  Header: AlertDialogUI.AlertDialogHeader,
  Footer: AlertDialogUI.AlertDialogFooter,

  Title: AlertDialogUI.AlertDialogTitle,
  Description: AlertDialogUI.AlertDialogDescription,

  Handle: AlertDialogUI.AlertDialogPrimitive.Handle,
  createHandle: AlertDialogUI.AlertDialogPrimitive.createHandle,
});

export const InputGroup = Object.assign(InputGroupUI.InputGroup, {
  Root: InputGroupUI.InputGroup,

  Addon: InputGroupUI.InputGroupAddon,
  AddonText: InputGroupUI.InputGroupText,

  Input: InputGroupUI.InputGroupInput,
  Textarea: InputGroupUI.InputGroupTextarea,
});

export const Combobox = Object.assign(ComboboxUI.Combobox, {
  Root: ComboboxUI.Combobox,

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

  createItems: ComboboxUI.ComboboxPrimitive.createItems,
});
