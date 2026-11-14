# Vendor

使用以下命令查看上游源码及依赖，对比本地后手动选择性更新，保留必要的本地调整。

```sh
cd packages/react
bunx shadcn view <ID>
```

shadcn 组件使用 `components.json` 中的 `base-vega` 风格和 Lucide 图标。表中仅简要记录额外的本地修改，不包含 CLI 根据配置生成的导入路径、图标和样式转换。

| ID | File | Docs | Modifications |
| --- | --- | --- | --- |
| `@coss/alert-dialog` | [coss/alert-dialog.tsx](coss/alert-dialog.tsx) | [Alert Dialog](https://coss.com/ui/docs/components/alert-dialog) | `font-bold text-xl` 替换为 `font-semibold text-lg`；用 `@starting-style` 支持初始打开时的入场动画 |
| `@coss/calendar` | [coss/calendar.tsx](coss/calendar.tsx) | [Calendar](https://coss.com/ui/docs/components/calendar) | 根据 `navigator.language` 自动设置 `locale` 为 zhCN 或 enUS |
| `@coss/card` | [coss/card.tsx](coss/card.tsx) | [Card](https://coss.com/ui/docs/components/card) | 用 `--card-spacing` 与 `--card-gap` 替代分段 padding；新增 `spacing`、`gap` 属性写入对应变量；标题改为 `text-base font-semibold leading-normal`；首尾图片贴边并补圆角 |
| `@coss/dialog` | [coss/dialog.tsx](coss/dialog.tsx) | [Dialog](https://coss.com/ui/docs/components/dialog) | `font-bold text-xl` 替换为 `font-semibold text-lg`；用 `@starting-style` 支持初始打开时的入场动画 |
| `@coss/drawer` | [coss/drawer.tsx](coss/drawer.tsx) | [Drawer](https://coss.com/ui/docs/components/drawer) | `font-bold text-xl` 替换为 `font-semibold text-lg`；用 `@starting-style` 支持初始打开时的入场动画 |
| `@coss/empty` | [coss/empty.tsx](coss/empty.tsx) | [Empty](https://coss.com/ui/docs/components/empty) | `font-bold text-xl` 替换为 `font-semibold text-lg` |
| `@coss/form` | [coss/form.tsx](coss/form.tsx) | [Form](https://coss.com/ui/docs/components/form) | — |
| `@coss/scroll-area` | [coss/scroll-area.tsx](coss/scroll-area.tsx) | [Scroll Area](https://coss.com/ui/docs/components/scroll-area) | — |
| `@coss/table` | [coss/table.tsx](coss/table.tsx) | [Table](https://coss.com/ui/docs/components/table) | 默认变体的 `TableFooter` 移除底色，与 `card` 变体一样保持透明 |
| `@coss/use-copy-to-clipboard` | [coss/hooks/use-copy-to-clipboard.ts](coss/hooks/use-copy-to-clipboard.ts) | [useCopyToClipboard](https://coss.com/ui/docs/hooks/use-copy-to-clipboard) | — |
| `@coss/use-media-query` | [coss/hooks/use-media-query.ts](coss/hooks/use-media-query.ts) | [useMediaQuery](https://coss.com/ui/docs/hooks/use-media-query) | 断点：`md` 设为 768px，与 Tailwind 默认值一致 |
| `@reui/cascader` | [reui.io/cascader/cascader.tsx](reui.io/cascader/cascader.tsx) | [Cascader](https://reui.io/docs/components/cascader) | 重映射 `scroll-area` 与 `spinner` 的导入 |
| `@reui/frame` | [reui.io/frame.tsx](reui.io/frame.tsx) | [Frame](https://reui.io/docs/components/base/frame) | — |
| `@reui/timeline` | [reui.io/timeline.tsx](reui.io/timeline.tsx) | [Timeline](https://reui.io/docs/components/timeline) | — |
| `badge` | [shadcn/badge.tsx](shadcn/badge.tsx) | [Badge](https://ui.shadcn.com/docs/components/base/badge) | 提供 `info`、`success`、`warning` 语义变体 |
| `breadcrumb` | [shadcn/breadcrumb.tsx](shadcn/breadcrumb.tsx) | [Breadcrumb](https://ui.shadcn.com/docs/components/base/breadcrumb) | 未显式指定 `BreadcrumbList` 则自动包裹 |
| `button` | [shadcn/button.tsx](shadcn/button.tsx) | [Button](https://ui.shadcn.com/docs/components/base/button) | `pill` 提供全圆角；`isPending` 提供加载态；提供额外 `destructive` 系列样式变体 |
| `button-group` | [shadcn/button-group.tsx](shadcn/button-group.tsx) | [Button Group](https://ui.shadcn.com/docs/components/base/button-group) | — |
| `carousel` | [shadcn/carousel.tsx](shadcn/carousel.tsx) | [Carousel](https://ui.shadcn.com/docs/components/base/carousel) | — |
| `checkbox` | [shadcn/checkbox.tsx](shadcn/checkbox.tsx) | [Checkbox](https://ui.shadcn.com/docs/components/base/checkbox) | — |
| `combobox` | [shadcn/combobox.tsx](shadcn/combobox.tsx) | [Combobox](https://ui.shadcn.com/docs/components/base/combobox) | 将选中标记移至左侧 |
| `context-menu` | [shadcn/context-menu.tsx](shadcn/context-menu.tsx) | [Context Menu](https://ui.shadcn.com/docs/components/base/context-menu) | — |
| `direction` | [shadcn/direction.tsx](shadcn/direction.tsx) | [Direction](https://ui.shadcn.com/docs/components/base/direction) | — |
| `dropdown-menu` | [shadcn/dropdown-menu.tsx](shadcn/dropdown-menu.tsx) | [Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu) | — |
| `field` | [shadcn/field.tsx](shadcn/field.tsx) | [Field](https://ui.shadcn.com/docs/components/base/field) | — |
| `input` | [shadcn/input.tsx](shadcn/input.tsx) | [Input](https://ui.shadcn.com/docs/components/base/input) | 参考 coss ui 处理自动填充的文字颜色，用背景色过渡抑制浏览器底色、内阴影绘制填充色 |
| `input-group` | [shadcn/input-group.tsx](shadcn/input-group.tsx) | [Input Group](https://ui.shadcn.com/docs/components/base/input-group) | — |
| `kbd` | [shadcn/kbd.tsx](shadcn/kbd.tsx) | [Kbd](https://ui.shadcn.com/docs/components/base/kbd) | — |
| `label` | [shadcn/label.tsx](shadcn/label.tsx) | [Label](https://ui.shadcn.com/docs/components/base/label) | — |
| `pagination` | [shadcn/pagination.tsx](shadcn/pagination.tsx) | [Pagination](https://ui.shadcn.com/docs/components/base/pagination) | 未显式指定 `PaginationContent` 则自动包裹 |
| `popover` | [shadcn/popover.tsx](shadcn/popover.tsx) | [Popover](https://ui.shadcn.com/docs/components/base/popover) | — |
| `progress` | [shadcn/progress.tsx](shadcn/progress.tsx) | [Progress](https://ui.shadcn.com/docs/components/base/progress) | — |
| `radio-group` | [shadcn/radio-group.tsx](shadcn/radio-group.tsx) | [Radio Group](https://ui.shadcn.com/docs/components/base/radio-group) | — |
| `select` | [shadcn/select.tsx](shadcn/select.tsx) | [Select](https://ui.shadcn.com/docs/components/base/select) | `alignItemWithTrigger` 改为默认 `false`；未显式指定 `SelectGroup` 则自动包裹；将选中标记移至左侧 |
| `separator` | [shadcn/separator.tsx](shadcn/separator.tsx) | [Separator](https://ui.shadcn.com/docs/components/base/separator) | — |
| `sheet` | [shadcn/sheet.tsx](shadcn/sheet.tsx) | [Sheet](https://ui.shadcn.com/docs/components/base/sheet) | — |
| `sidebar` | [shadcn/sidebar.tsx](shadcn/sidebar.tsx) | [Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) | `useIsMobile` 改为从 `@/vendor/coss/hooks/use-media-query` 导入 |
| `skeleton` | [shadcn/skeleton.tsx](shadcn/skeleton.tsx) | [Skeleton](https://ui.shadcn.com/docs/components/base/skeleton) | — |
| `spinner` | [shadcn/spinner.tsx](shadcn/spinner.tsx) | [Spinner](https://ui.shadcn.com/docs/components/base/spinner) | — |
| `switch` | [shadcn/switch.tsx](shadcn/switch.tsx) | [Switch](https://ui.shadcn.com/docs/components/base/switch) | — |
| `tabs` | [shadcn/tabs.tsx](shadcn/tabs.tsx) | [Tabs](https://ui.shadcn.com/docs/components/base/tabs) | — |
| `textarea` | [shadcn/textarea.tsx](shadcn/textarea.tsx) | [Textarea](https://ui.shadcn.com/docs/components/base/textarea) | — |
| `toast` | [shadcn/toast.tsx](shadcn/toast.tsx) | [Toast](https://ui.shadcn.com/docs/components/base/toast) | — |
| `tooltip` | [shadcn/tooltip.tsx](shadcn/tooltip.tsx) | [Tooltip](https://ui.shadcn.com/docs/components/base/tooltip) | — |

## Tailored

`tailored/` 存放：仅少量引入的上游组件 或 需要较大调整的单体组件

- 按本地需求维护，对比后选择性吸收上游修复，避免直接覆盖本地实现。
- 优先复用已有基础组件；仅供该组件使用的依赖可内联，分别记录其来源。

| ID | File | Docs | Modifications |
| --- | --- | --- | --- |
| `https://ui.iandefined.com/r/icon-swap.json` | [tailored/icon-swap.tsx](tailored/icon-swap.tsx) | [Icon Swap](https://ui.iandefined.com/docs/utilities/icon-swap/) | 进出场动画减弱模糊为 2px，缩短为 0.2s 时长 |
| `https://ui.iandefined.com/r/lightbox.json` | [tailored/lightbox.tsx](tailored/lightbox.tsx) | [Lightbox](https://ui.iandefined.com/docs/components/lightbox/) | 适配本地组件和尺寸；修正嵌套弹层层级与点击隔离；补充加载失败反馈 |
| `https://ui.iandefined.com/r/scroll-area.json` | [tailored/lightbox.tsx](tailored/lightbox.tsx) | [Scroll Area](https://ui.iandefined.com/docs/components/scroll-area/) | 作为 Lightbox 的私有依赖内联 |
| `Tinkerers-Labs/mischief-ui/json-viewer` | [tailored/json-viewer.tsx](tailored/json-viewer.tsx) | [JSON Viewer](https://ui.tinkererslabs.com/docs/components/json-viewer/) | — |
