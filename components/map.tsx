import maplibregl, { LngLatLike, Map as MapLibreGL } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import MapTooltip from "./map-tooltip";

export default function Map({
  selectedPointOnMap,
}: {
  selectedPointOnMap: number[];
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibreGL | null>(null);
  const [zoom] = useState(5);
  const [API_KEY] = useState(`${process.env.NEXT_PUBLIC_MAP_API_KEY}`);

  useEffect(() => {
    // Stops map from intializing more than once
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [19.0, 51.5],
      zoom: zoom,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      // Load custom marker for map
      map.current.loadImage("marker.png", async (error, image) => {
        if (error) throw error;
        if (!map.current) return;

        // Add custom marker form map
        map.current.addImage("custom-marker", image as ImageBitmap);

        // Add controls to map
        map.current.addControl(new maplibregl.NavigationControl());

        // Add locate me
        map.current.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );

        // Add geo data to map
        map.current.addSource("places", {
          type: "geojson",
          // example data TODO fetch from API
          data: {
            type: "FeatureCollection",
          },
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "places",
          filter: ["has", "point_count"],
          paint: {
            //   * Light orange, 20px circles when point count is less than 100
            //   * Orange, 30px circles when point count is between 100 and 750
            //   * Dark orange, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#e75132",
              100,
              "#ab2105",
              750,
              "#621100",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "places",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 14,
          },
          paint: {
            "text-color": "#ffffff",
          },
        });

        // Add a layer showing the places with custom marker
        map.current.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          filter: ["!", ["has", "point_count"]],

          layout: {
            "icon-image": "custom-marker",
            "icon-overlap": "always",
          },
        });
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.current.on("click", "places", async (e) => {
        // Chcek if e.features exists
        if (!e.features) return;

        // Check geometry type must be "Point"
        if (e.features[0].geometry.type !== "Point") return;
        const id = e.features[0].id as number;
        const coordinates = e.features[0].geometry.coordinates.slice();
        const address = await JSON.parse(e.features[0].properties.address);
        const label = address.label as string;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const popup = document.createElement("div");
        createRoot(popup).render(
          <MapTooltip parkingId={id} parkingLabel={label} />
        );

        new maplibregl.Popup({
          closeButton: false,
        })
          .setLngLat(coordinates as LngLatLike)
          .setDOMContent(popup)
          .addTo(map.current as maplibregl.Map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "places", () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "places", () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = "";
      });
    });
  }, [API_KEY, zoom]);

  useEffect(() => {
    if (selectedPointOnMap[0] === 19.0 && selectedPointOnMap[1] === 51.5)
      return;
    if (map.current) {
      map.current.setCenter(selectedPointOnMap as LngLatLike);
      map.current.setZoom(14);
    }
  }, [selectedPointOnMap]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
