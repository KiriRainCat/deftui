import type { ComponentProps } from "react";

import { cn, Form } from "@deftui/react";

export function RHFForm(props: ComponentProps<typeof Form>) {
  const { children, className, ...formProps } = props;

  return (
    <Form {...formProps} className={cn("flex min-h-0 flex-col gap-4", className)}>
      {children}
    </Form>
  );
}
