# @deftui/react

A React component library built on Base UI, shadcn/ui, and their open-source registry ecosystem, offering easy-to-use compound component APIs.

> Most basic components expose exactly the same APIs as their shadcn/ui counterparts backed by Base UI.

## Installation

```sh
bun add @deftui/react
```

## Usage

Install Tailwind CSS 4 in your project first, then import the styles in your application's global CSS:

```css
@import "tailwindcss";
@import "@deftui/react/styles";
```

Component Example:

```tsx
import { Button, Card } from "@deftui/react";

export function Example() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome to Deft UI</Card.Title>
        <Card.Description>Compose your UI using Compound Component API</Card.Description>
      </Card.Header>

      <Card.Panel>
        <Button>Get started</Button>
      </Card.Panel>
    </Card>
  );
}
```
