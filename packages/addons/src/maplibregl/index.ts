import * as MapUI from "./map";

export type * from "./map";
export { useMap } from "./map";

export const Map = /* @__PURE__ */ Object.assign(MapUI.Map, {
  Marker: MapUI.MapMarker,
  MarkerContent: MapUI.MarkerContent,
  MarkerPopup: MapUI.MarkerPopup,
  MarkerTooltip: MapUI.MarkerTooltip,
  MarkerLabel: MapUI.MarkerLabel,

  Popup: MapUI.MapPopup,
  Controls: MapUI.MapControls,

  Route: MapUI.MapRoute,
  RouteProgress: MapUI.RouteProgress,
  RouteMarker: MapUI.RouteMarker,

  Arc: MapUI.MapArc,
  GeoJSON: MapUI.MapGeoJSON,
  ClusterLayer: MapUI.MapClusterLayer,
});
