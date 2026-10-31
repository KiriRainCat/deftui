# Vendor

使用以下命令查看上游源码及依赖，对比本地后手动选择性更新，保留必要的本地调整。

```sh
cd packages/react
bunx shadcn view <ID>
```

shadcn 组件使用 `components.json` 中的 `base-vega` 风格和 Lucide 图标。表中仅简要记录额外的本地修改，不包含 CLI 根据配置生成的导入路径、图标和样式转换。

| ID | File | Docs | Modifications |
| --- | --- | --- | --- |
| `@coss/empty` | [coss/empty.tsx](coss/empty.tsx) | [Empty](https://coss.com/ui/docs/components/empty) | — |
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
| `field` | [shadcn/field.tsx](shadcn/field.tsx) | [Field](https://ui.shadcn.com/docs/components/base/field) | — |
| `input` | [shadcn/input.tsx](shadcn/input.tsx) | [Input](https://ui.shadcn.com/docs/components/base/input) | 参考 coss ui 处理自动填充的文字颜色，用背景色过渡抑制浏览器底色、内阴影绘制填充色 |
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

## Tailored

`tailored/` 存放基于上游、需要较大结构或行为调整的单体组件。仅需导入路径、图标或少量样式适配的组件，仍放在对应的来源目录。

- 按本地需求维护，对比后选择性吸收上游修复，避免直接覆盖本地实现。
- 优先复用已有基础组件；仅供该组件使用的依赖可内联，分别记录其来源。
- 下表记录主组件及内联依赖的 registry ID、文档和主要修改；对外的组合封装放在 `widgets/`。

| ID | File | Docs | Modifications |
| --- | --- | --- | --- |
| `https://ui.iandefined.com/r/icon-swap.json` | [tailored/icon-swap.tsx](tailored/icon-swap.tsx) | [Icon Swap](https://ui.iandefined.com/docs/utilities/icon-swap/) | 进出场动画减弱模糊为 2px，缩短为 0.2s 时长 |
| `https://ui.iandefined.com/r/lightbox.json` | [tailored/lightbox.tsx](tailored/lightbox.tsx) | [Lightbox](https://ui.iandefined.com/docs/components/lightbox/) | 适配本地组件和尺寸；修正嵌套弹层层级与点击隔离；补充加载失败反馈 |
| `https://ui.iandefined.com/r/scroll-area.json` | [tailored/lightbox.tsx](tailored/lightbox.tsx) | [Scroll Area](https://ui.iandefined.com/docs/components/scroll-area/) | 作为 Lightbox 的私有依赖内联 |
