# Vendor

使用以下命令查看上游源码及依赖，对比本地后手动选择性更新，保留必要的本地调整。

```sh
cd packages/react
bunx shadcn view <ID>
```

shadcn 组件使用 `components.json` 中的 `base-vega` 风格和 Lucide 图标。表中仅简要记录额外的本地修改，不包含 CLI 根据配置生成的导入路径、图标和样式转换。

| ID | File | Docs | Modifications |
| --- | --- | --- | --- |
| `@coss/form` | [coss/form.tsx](coss/form.tsx) | [Form](https://coss.com/ui/docs/components/form) | — |
| `@coss/scroll-area` | [coss/scroll-area.tsx](coss/scroll-area.tsx) | [Scroll Area](https://coss.com/ui/docs/components/scroll-area) | — |
| `@coss/use-copy-to-clipboard` | [coss/hooks/use-copy-to-clipboard.ts](coss/hooks/use-copy-to-clipboard.ts) | [useCopyToClipboard](https://coss.com/ui/docs/hooks/use-copy-to-clipboard) | — |
| `@coss/use-media-query` | [coss/hooks/use-media-query.ts](coss/hooks/use-media-query.ts) | [useMediaQuery](https://coss.com/ui/docs/hooks/use-media-query) | 断点：`md` 设为 768px，与 Tailwind 默认值一致 |
| `alert-dialog` | [shadcn/alert-dialog.tsx](shadcn/alert-dialog.tsx) | [Alert Dialog](https://ui.shadcn.com/docs/components/base/alert-dialog) | 额外导出 `createAlertDialogHandle` 及其类型 |
| `badge` | [shadcn/badge.tsx](shadcn/badge.tsx) | [Badge](https://ui.shadcn.com/docs/components/base/badge) | 提供 `info`、`success`、`warning` 语义变体 |
| `breadcrumb` | [shadcn/breadcrumb.tsx](shadcn/breadcrumb.tsx) | [Breadcrumb](https://ui.shadcn.com/docs/components/base/breadcrumb) | — |
| `button` | [shadcn/button.tsx](shadcn/button.tsx) | [Button](https://ui.shadcn.com/docs/components/base/button) | `pill` 提供全圆角；`isPending` 提供居中 Spinner 加载态 |
| `button-group` | [shadcn/button-group.tsx](shadcn/button-group.tsx) | [Button Group](https://ui.shadcn.com/docs/components/base/button-group) | — |
| `calendar` | [shadcn/calendar.tsx](shadcn/calendar.tsx) | [Calendar](https://ui.shadcn.com/docs/components/base/calendar) | 将 `react-day-picker` 导入改为 `@daypicker/react` |
| `card` | [shadcn/card.tsx](shadcn/card.tsx) | [Card](https://ui.shadcn.com/docs/components/base/card) | — |
| `carousel` | [shadcn/carousel.tsx](shadcn/carousel.tsx) | [Carousel](https://ui.shadcn.com/docs/components/base/carousel) | — |
| `combobox` | [shadcn/combobox.tsx](shadcn/combobox.tsx) | [Combobox](https://ui.shadcn.com/docs/components/base/combobox) | 额外导出 `createComboboxItems` 及其类型 |
| `dialog` | [shadcn/dialog.tsx](shadcn/dialog.tsx) | [Dialog](https://ui.shadcn.com/docs/components/base/dialog) | 额外导出 `createDialogHandle` 及其类型 |
| `direction` | [shadcn/direction.tsx](shadcn/direction.tsx) | [Direction](https://ui.shadcn.com/docs/components/base/direction) | — |
| `drawer` | [shadcn/drawer.tsx](shadcn/drawer.tsx) | [Drawer](https://ui.shadcn.com/docs/components/base/drawer) | 额外导出 `createDrawerHandle` 及其类型 |
| `dropdown-menu` | [shadcn/dropdown-menu.tsx](shadcn/dropdown-menu.tsx) | [Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu) | — |
| `empty` | [shadcn/empty.tsx](shadcn/empty.tsx) | [Empty](https://ui.shadcn.com/docs/components/base/empty) | — |
| `field` | [shadcn/field.tsx](shadcn/field.tsx) | [Field](https://ui.shadcn.com/docs/components/base/field) | — |
| `input` | [shadcn/input.tsx](shadcn/input.tsx) | [Input](https://ui.shadcn.com/docs/components/base/input) | 参考 coss ui 处理自动填充的背景色和文字颜色 |
| `input-group` | [shadcn/input-group.tsx](shadcn/input-group.tsx) | [Input Group](https://ui.shadcn.com/docs/components/base/input-group) | — |
| `kbd` | [shadcn/kbd.tsx](shadcn/kbd.tsx) | [Kbd](https://ui.shadcn.com/docs/components/base/kbd) | — |
| `label` | [shadcn/label.tsx](shadcn/label.tsx) | [Label](https://ui.shadcn.com/docs/components/base/label) | — |
| `pagination` | [shadcn/pagination.tsx](shadcn/pagination.tsx) | [Pagination](https://ui.shadcn.com/docs/components/base/pagination) | — |
| `popover` | [shadcn/popover.tsx](shadcn/popover.tsx) | [Popover](https://ui.shadcn.com/docs/components/base/popover) | — |
| `progress` | [shadcn/progress.tsx](shadcn/progress.tsx) | [Progress](https://ui.shadcn.com/docs/components/base/progress) | — |
| `radio-group` | [shadcn/radio-group.tsx](shadcn/radio-group.tsx) | [Radio Group](https://ui.shadcn.com/docs/components/base/radio-group) | — |
| `select` | [shadcn/select.tsx](shadcn/select.tsx) | [Select](https://ui.shadcn.com/docs/components/base/select) | `alignItemWithTrigger` 改为默认 `false` |
| `separator` | [shadcn/separator.tsx](shadcn/separator.tsx) | [Separator](https://ui.shadcn.com/docs/components/base/separator) | — |
| `sheet` | [shadcn/sheet.tsx](shadcn/sheet.tsx) | [Sheet](https://ui.shadcn.com/docs/components/base/sheet) | — |
| `sidebar` | [shadcn/sidebar.tsx](shadcn/sidebar.tsx) | [Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) | `useIsMobile` 改为从 `@/vendor/coss/hooks/use-media-query` 导入 |
| `skeleton` | [shadcn/skeleton.tsx](shadcn/skeleton.tsx) | [Skeleton](https://ui.shadcn.com/docs/components/base/skeleton) | — |
| `spinner` | [shadcn/spinner.tsx](shadcn/spinner.tsx) | [Spinner](https://ui.shadcn.com/docs/components/base/spinner) | — |
| `switch` | [shadcn/switch.tsx](shadcn/switch.tsx) | [Switch](https://ui.shadcn.com/docs/components/base/switch) | — |
| `table` | [shadcn/table.tsx](shadcn/table.tsx) | [Table](https://ui.shadcn.com/docs/components/base/table) | — |
| `tabs` | [shadcn/tabs.tsx](shadcn/tabs.tsx) | [Tabs](https://ui.shadcn.com/docs/components/base/tabs) | — |
| `textarea` | [shadcn/textarea.tsx](shadcn/textarea.tsx) | [Textarea](https://ui.shadcn.com/docs/components/base/textarea) | — |
| `toast` | [shadcn/toast.tsx](shadcn/toast.tsx) | [Toast](https://ui.shadcn.com/docs/components/base/toast) | — |
| `tooltip` | [shadcn/tooltip.tsx](shadcn/tooltip.tsx) | [Tooltip](https://ui.shadcn.com/docs/components/base/tooltip) | — |
