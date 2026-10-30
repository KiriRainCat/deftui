import { castArray } from "radashi";
import React from "react";

import * as BreadcrumbUI from "@/vendor/shadcn/breadcrumb";

type ASTProps = Omit<React.ComponentProps<typeof BreadcrumbUI.Breadcrumb>, "children"> & {
  children: React.ReactElement | React.ReactElement[];
};

function BreadcrumbAST({ children, ...props }: ASTProps) {
  return (
    <Breadcrumb {...props}>
      <Breadcrumb.List>
        {castArray(children).map((item, index) => (
          <React.Fragment key={item.key ?? index}>
            {index > 0 && <Breadcrumb.Separator />}
            <Breadcrumb.Item>{item}</Breadcrumb.Item>
          </React.Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb>
  );
}

export const Breadcrumb = /* @__PURE__ */ Object.assign(BreadcrumbUI.Breadcrumb, {
  AST: BreadcrumbAST,
  Root: BreadcrumbUI.Breadcrumb,

  List: BreadcrumbUI.BreadcrumbList,

  Item: BreadcrumbUI.BreadcrumbItem,
  Separator: BreadcrumbUI.BreadcrumbSeparator,

  Link: BreadcrumbUI.BreadcrumbLink,
  Ellipsis: BreadcrumbUI.BreadcrumbEllipsis,
  Page: BreadcrumbUI.BreadcrumbPage,
});
