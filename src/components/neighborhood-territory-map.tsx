"use client";

import { useEffect, useRef } from "react";
import { LngLatBounds, Map as MapLibreMap, NavigationControl, type Point } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Borough } from "@/lib/neighborhoods";
import { cn } from "@/lib/utils";

type TerritoryFeature = GeoJSON.Feature<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  { kind: "live" | "ghost"; slug?: string; name?: string; borough?: Borough }
>;

type Props = {
  activeSlug: string | null;
  camera: { target: Borough | "all"; nonce: number };
  onActiveSlug: (slug: string | null) => void;
  onNavigate: (slug: string) => void;
};

const PAPER = "#F7F8FA";
const NAVY = "#101B2D";
const PLATINUM = "#B8BCC2";
const TERRITORY_URL = "/geo/nyc-territory.json";

function extendBounds(bounds: LngLatBounds, geometry: TerritoryFeature["geometry"]) {
  const rings =
    geometry.type === "Polygon"
      ? geometry.coordinates
      : geometry.coordinates.flat();
  for (const ring of rings) {
    for (const coord of ring) {
      const lng = coord[0];
      const lat = coord[1];
      if (typeof lng === "number" && typeof lat === "number") {
        bounds.extend([lng, lat]);
      }
    }
  }
}

function boundsFor(
  features: TerritoryFeature[],
  borough: Borough | "all",
): LngLatBounds | null {
  const bounds = new LngLatBounds();
  let count = 0;
  for (const feature of features) {
    if (borough !== "all") {
      if (feature.properties.kind !== "live" || feature.properties.borough !== borough) continue;
    }
    extendBounds(bounds, feature.geometry);
    count += 1;
  }
  return count ? bounds : null;
}

function liveSlugAtPoint(map: MapLibreMap, point: Point): string | null {
  const hits = map.queryRenderedFeatures(point, { layers: ["live-fill"] });
  const slug = hits[0]?.properties?.slug;
  return typeof slug === "string" ? slug : null;
}

export function NeighborhoodTerritoryMap({ activeSlug, camera, onActiveSlug, onNavigate }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const featuresRef = useRef<TerritoryFeature[]>([]);
  const activeRef = useRef(activeSlug);
  const onActiveRef = useRef(onActiveSlug);
  const onNavigateRef = useRef(onNavigate);
  const lastTapRef = useRef<{ slug: string; at: number } | null>(null);
  const cameraRef = useRef(camera);

  activeRef.current = activeSlug;
  onActiveRef.current = onActiveSlug;
  onNavigateRef.current = onNavigate;
  cameraRef.current = camera;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let map: MapLibreMap | null = null;
    let resizeObserver: ResizeObserver | undefined;
    let removeListeners: (() => void) | undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const duration = reduceMotion ? 0 : 500;

    (async () => {
      const response = await fetch(TERRITORY_URL);
      if (!response.ok) throw new Error("Could not load territory GeoJSON");
      const collection = (await response.json()) as GeoJSON.FeatureCollection<
        GeoJSON.Polygon | GeoJSON.MultiPolygon,
        TerritoryFeature["properties"]
      >;
      if (cancelled || !containerRef.current) return;
      featuresRef.current = collection.features as TerritoryFeature[];

      map = new MapLibreMap({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            territory: {
              type: "geojson",
              data: TERRITORY_URL,
            },
          },
          layers: [
            {
              id: "background",
              type: "background",
              paint: { "background-color": PAPER },
            },
            {
              id: "ghost-fill",
              type: "fill",
              source: "territory",
              filter: ["==", ["get", "kind"], "ghost"],
              paint: { "fill-color": PLATINUM, "fill-opacity": 0.16 },
            },
            {
              id: "ghost-line",
              type: "line",
              source: "territory",
              filter: ["==", ["get", "kind"], "ghost"],
              paint: { "line-color": PLATINUM, "line-width": 0.4, "line-opacity": 0.7 },
            },
            {
              id: "live-fill",
              type: "fill",
              source: "territory",
              filter: ["==", ["get", "kind"], "live"],
              paint: {
                "fill-color": NAVY,
                "fill-opacity": [
                  "case",
                  ["boolean", ["feature-state", "active"], false],
                  0.42,
                  0.1,
                ],
              },
            },
            {
              id: "live-line",
              type: "line",
              source: "territory",
              filter: ["==", ["get", "kind"], "live"],
              paint: {
                "line-color": NAVY,
                "line-width": [
                  "case",
                  ["boolean", ["feature-state", "active"], false],
                  1.6,
                  0.9,
                ],
                "line-opacity": 0.85,
              },
            },
          ],
        },
        attributionControl: false,
        cooperativeGestures: true,
        fadeDuration: duration,
        renderWorldCopies: false,
      });
      mapRef.current = map;
      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
      map.on("error", (event) => {
        console.error(event.error ?? event);
      });
      const resizeObserverInstance = new ResizeObserver(() => {
        map?.resize();
      });
      resizeObserver = resizeObserverInstance;
      resizeObserverInstance.observe(containerRef.current);

      const applyActive = (slug: string | null) => {
        const current = map;
        if (!current?.getSource("territory")) return;
        for (const feature of featuresRef.current) {
          if (feature.properties.kind !== "live" || typeof feature.id !== "string") continue;
          current.setFeatureState(
            { source: "territory", id: feature.id },
            { active: feature.id === slug },
          );
        }
      };

      let framed = false;
      const onReady = () => {
        if (!map || cancelled || framed) return;
        framed = true;
        const initial =
          boundsFor(featuresRef.current, cameraRef.current.target) ?? boundsFor(featuresRef.current, "all");
        if (initial) map.fitBounds(initial, { padding: cameraRef.current.target === "all" ? 28 : 48, duration: 0 });
        map.resize();
        applyActive(activeRef.current);
      };
      if (map.loaded()) onReady();
      else {
        map.once("style.load", onReady);
        map.once("load", onReady);
      }

      map.on("mousemove", "live-fill", (event) => {
        map!.getCanvas().style.cursor = "pointer";
        const slug = liveSlugAtPoint(map!, event.point);
        if (slug !== activeRef.current) onActiveRef.current(slug);
      });
      map.on("mouseleave", "live-fill", () => {
        map!.getCanvas().style.cursor = "";
        if (!coarse) onActiveRef.current(null);
      });
      map.on("click", "live-fill", (event) => {
        const slug = liveSlugAtPoint(map!, event.point);
        if (!slug) return;
        if (coarse) {
          const last = lastTapRef.current;
          const now = Date.now();
          if (last && last.slug === slug && now - last.at < 700) {
            onNavigateRef.current(slug);
            return;
          }
          lastTapRef.current = { slug, at: now };
          onActiveRef.current(slug);
          return;
        }
        onNavigateRef.current(slug);
      });

      removeListeners = () => {
        applyActive(null);
      };
    })().catch((error) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
      removeListeners?.();
      resizeObserver?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getSource("territory")) return;
    for (const feature of featuresRef.current) {
      if (feature.properties.kind !== "live" || typeof feature.id !== "string") continue;
      map.setFeatureState({ source: "territory", id: feature.id }, { active: feature.id === activeSlug });
    }
  }, [activeSlug]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.getSource("territory")) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bounds = boundsFor(featuresRef.current, camera.target);
    if (!bounds) return;
    map.fitBounds(bounds, { padding: camera.target === "all" ? 28 : 48, duration: reduceMotion ? 0 : 500 });
  }, [camera]);

  return (
    <div
      ref={containerRef}
      className={cn("territory-map h-[min(70vh,720px)] w-full border border-[var(--line)] bg-[var(--paper)]")}
    />
  );
}
