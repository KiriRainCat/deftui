import * as SidebarUI from "@/vendor/shadcn/sidebar";
export { useSidebar } from "@/vendor/shadcn/sidebar";

export const Sidebar = /* @__PURE__ */ Object.assign(SidebarUI.Sidebar, {
  Provider: SidebarUI.SidebarProvider,

  Root: SidebarUI.Sidebar,
  Inset: SidebarUI.SidebarInset,
  Trigger: SidebarUI.SidebarTrigger,

  Header: SidebarUI.SidebarHeader,
  Content: SidebarUI.SidebarContent,
  Footer: SidebarUI.SidebarFooter,
  Rail: SidebarUI.SidebarRail,

  Group: SidebarUI.SidebarGroup,
  GroupLabel: SidebarUI.SidebarGroupLabel,
  GroupAction: SidebarUI.SidebarGroupAction,
  GroupContent: SidebarUI.SidebarGroupContent,

  Menu: SidebarUI.SidebarMenu,
  MenuItem: SidebarUI.SidebarMenuItem,
  MenuButton: SidebarUI.SidebarMenuButton,
  MenuAction: SidebarUI.SidebarMenuAction,
  MenuBadge: SidebarUI.SidebarMenuBadge,

  MenuSub: SidebarUI.SidebarMenuSub,
  MenuSubItem: SidebarUI.SidebarMenuSubItem,
  MenuSubButton: SidebarUI.SidebarMenuSubButton,

  Input: SidebarUI.SidebarInput,
  Separator: SidebarUI.SidebarSeparator,
});
