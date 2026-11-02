# Deft UI

基于 Base UI、shadcn/ui 及其开源组件生态的 React 组件库，使用复合组件 API 组织界面，搭配 Tailwind CSS 4 提供统一样式。

## 快速开始

在已配置 React 19 和 Tailwind CSS 4 的项目中安装：

```sh
bun add @deftui/react
```

在全局 CSS 中引入样式：

```css
@import "tailwindcss";
@import "@deftui/react/styles";
```

使用组件：

```tsx
import { Button, Card } from "@deftui/react";

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Deft UI</Card.Title>
        <Card.Description>用复合组件 API 构建界面。</Card.Description>
      </Card.Header>

      <Card.Content>
        <Button>开始使用</Button>
      </Card.Content>
    </Card>
  );
}
```

## 扩展功能

按需安装 `@deftui/addons`，从对应入口导入：

```sh
bun add @deftui/addons
```

| 入口                    | 导出                    | 额外依赖                 |
| ----------------------- | ----------------------- | ------------------------ |
| `@deftui/addons/form`   | `RHF.Form`、`RHF.Field` | `react-hook-form`        |
| `@deftui/addons/modal`  | `createModalManager`    | —                        |
| `@deftui/addons/router` | `collectNavigation`     | `@tanstack/react-router` |

使用扩展组件时，在全局 CSS 中追加 `@import "@deftui/addons/styles";`。

## 本地开发

使用 Bun 安装依赖，在仓库根目录执行：

```sh
bun install
bun run fix
bun run build
```

`fix` 执行 `vp check --fix`，统一完成格式化、Lint 和 TypeScript 检查；`build` 构建两个包，输出到各自的 `dist/` 目录。
