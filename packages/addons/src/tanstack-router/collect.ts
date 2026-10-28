import type { NavigationGroup, NavigationLinkOptions, NavigationOptions, NavigationMeta } from "./types";

/**
 * Collects & builds sidebar and command groups from `staticData.navigation`.
 *
 * @returns Nonempty groups in configuration order, with items sorted by `order`.
 *
 * @example
 * const groups = collectNavigation({
 *   router,
 *   groups: { inspection: "Inspection" },
 *   resolveLink: () => ({ params: { team } }),
 * });
 */
export function collectNavigation({ router, groups, resolveLink }: NavigationOptions): NavigationGroup[] {
  const navigation = new Map<string, NavigationGroup>(Object.entries(groups).map(([id, label]) => [id, { id, label, items: [] }]));

  for (const route of Object.values(router.routesById)) {
    const metadata = (route.options.staticData as NavigationMeta | undefined)?.navigation;
    if (!metadata || (metadata.visibility?.sidebar === false && metadata.visibility?.command === false)) continue;

    const group = navigation.get(metadata.group);
    if (!group) continue;

    const link = resolveLink?.(route);
    if (link === null) continue;

    group.items.push({
      ...metadata,
      id: route.id,
      link: {
        ...link,
        to: link?.to ?? (route.to as NavigationLinkOptions["to"]),
        activeOptions: link?.activeOptions ?? metadata.activeOptions,
      },
    });
  }

  for (const group of navigation.values()) group.items.sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
  return [...navigation.values()].filter((group) => group.items.length > 0);
}
