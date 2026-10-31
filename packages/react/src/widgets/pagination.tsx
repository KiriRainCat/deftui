import * as PaginationUI from "@/vendor/shadcn/pagination";

export const Pagination = /* @__PURE__ */ Object.assign(PaginationUI.Pagination, {
  Content: PaginationUI.PaginationContent,

  Item: PaginationUI.PaginationItem,
  Link: PaginationUI.PaginationLink,

  Next: PaginationUI.PaginationNext,
  Previous: PaginationUI.PaginationPrevious,
  Ellipsis: PaginationUI.PaginationEllipsis,
});
