import type { ActiveOptions, AnyRoute, AnyRouter, LinkOptions, RegisteredRouter } from "@tanstack/react-router";
import type { ComponentType } from "react";

export type NavigationLinkOptions = LinkOptions<RegisteredRouter, string, string, string, string>;

/**
 * Opt-in route metadata for `collectNavigation`.
 *
 * @example
 * declare module "@tanstack/react-router" {
 *   interface StaticDataRouteOption extends RouteMeta {}
 * }
 */
export interface NavigationMeta {
  /** Define in the main route file so collection does not depend on lazy loading. */
  navigation?: {
    /** A key in `NavigationOptions.groups`. */
    group: string;

    /** Ascending group position; defaults to 0. Ties retain route registration order. */
    order?: number;

    label: string;
    title?: string;

    icon?: ComponentType<{ className?: string }>;

    /** Additional search terms. */
    keywords?: readonly string[];

    /** Forwarded to Link. Use `{ exact: true }` for entries that should not match child paths. */
    activeOptions?: ActiveOptions;

    /** Both menus include the item by default. Set a flag to false to hide it in that menu. */
    visibility?: {
      sidebar?: false;
      command?: false;
    };
  };
}

/** Shared route metadata with its source identity and resolved link. */
export interface NavigationItem extends NonNullable<NavigationMeta["navigation"]> {
  /** Source route ID, including layout and index segments; distinct from the URL. */
  id: string;

  /** Pass directly to TanStack Link or `router.navigate`. */
  link: NavigationLinkOptions;
}

/** A configured group containing at least one collected item. */
export interface NavigationGroup {
  id: string;
  label?: string;

  /** Filter by `visibility.sidebar` or `visibility.command` when rendering; skip groups left empty. */
  items: NavigationItem[];
}

/** Collection scope and optional application-specific link resolution. */
export interface NavigationOptions {
  /** Initialized router whose route registry supplies the default destinations. */
  router: AnyRouter;

  /** IDs mapped to labels in display order; undefined omits the heading. Unlisted and empty groups are excluded. */
  groups: Readonly<Record<string, string | undefined>>;

  /**
   * Adds params/search or overrides `route.to` and the metadata's `activeOptions`.
   *
   * Called once per eligible entry; null excludes it from both menus.
   *
   * Without a callback, links use `route.to`. Supply params for dynamic targets.
   */
  resolveLink?: (route: AnyRoute) => NavigationLinkOptions | null;
}
