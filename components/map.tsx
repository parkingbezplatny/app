import maplibregl, {
  LngLatLike,
  MapGeoJSONFeature,
  Map as MapLibreGL,
  MapMouseEvent,
  Popup,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import { useGetParkingsForMap } from "@/lib/hooks/parkingHooks";
import MapTooltip from "./map-tooltip";
import { Spinner, Flex, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useFavoriteMutation } from "@/lib/hooks/useFavoriteMutation";

export default function Map({
  selectedPointOnMap,
}: {
  selectedPointOnMap: number[];
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibreGL | null>(null);
  const [zoom] = useState(5);
  const [API_KEY] = useState(`${process.env.NEXT_PUBLIC_MAP_API_KEY}`);

  const { data: parkingsForMapQueryResult, status } = useGetParkingsForMap();
  const { data: session, update } = useSession();
  const { addParkingToFavorite, removeParkingFromFavorite } =
    useFavoriteMutation();

  const [popupCoordinates, setPopupCoordinates] = useState<
    number[] | undefined
  >(undefined);
  const [parkingId, setParkingId] = useState<number>();
  const [parkingLabel, setParkingLabel] = useState<string>();
  const [popup, setPopup] = useState<Popup>();
  const [popupUpdate, setPopupUpdate] = useState<boolean>(false);

  const handleAddParkingToFavorite = async (pId: number) => {
    await addParkingToFavorite(pId.toString());
    await update();
    setPopupUpdate(true);
  };

  const handleRemoveParkingFromFavorite = async (pId: number) => {
    await removeParkingFromFavorite(pId.toString());
    await update();
    setPopupUpdate(true);
  };

  const handlePopup = async (
    e: MapMouseEvent & {
      features?: MapGeoJSONFeature[] | undefined;
    } & Object
  ) => {
    if (!e.features) return;

    if (e.features[0].geometry.type !== "Point") return;
    const id = e.features[0].id as number;
    const coordinates = e.features[0].geometry.coordinates.slice();
    const address = await JSON.parse(e.features[0].properties.address);
    const label = address.label as string;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    setParkingId(id);
    setParkingLabel(label);
    setPopupCoordinates(coordinates);
    setPopupUpdate(true);
  };

  const handleSetPopup = () => {
    const p = document.createElement("div");
    createRoot(p).render(
      <MapTooltip
        parkingId={parkingId}
        parkingLabel={parkingLabel}
        parkingCoordinates={[
          popupCoordinates![0] ?? 0,
          popupCoordinates![1] ?? 0,
        ]}
        session={session}
        addParkingToFavorite={handleAddParkingToFavorite}
        removeParkingFromFavorite={handleRemoveParkingFromFavorite}
      />
    );

    setPopup(
      new maplibregl.Popup({ closeButton: false })
        .setLngLat(popupCoordinates as LngLatLike)
        .setDOMContent(p)
        .addTo(map.current as maplibregl.Map)
    );
  };

  useEffect(() => {
    if (!popupUpdate) return;
    if (!popupCoordinates) return;
    handleSetPopup();
    setPopupUpdate(false);
  }, [popupUpdate]);

  useEffect(() => {
    if (status !== "success") return;
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [19.0, 51.5],
      zoom: zoom,
    });

    map.current.on("load", () => {
      if (!map.current) return;

      map.current.loadImage("marker.png", async (error, image) => {
        if (error) throw error;
        if (!map.current) return;

        map.current.addImage("custom-marker", image as ImageBitmap);

        map.current.addControl(new maplibregl.NavigationControl());

        map.current.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          })
        );

        map.current.addSource("places", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: parkingsForMapQueryResult?.data ?? [],
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "places",
          filter: ["has", "point_count"],
          paint: {
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

      map.current.on("mouseenter", "places", () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "places", () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = "";
      });

      map.current.on("click", "places", async (e) => {
        handlePopup(e);
      });
    });
  }, [API_KEY, zoom, parkingsForMapQueryResult, status]);

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
      <div ref={mapContainer} className="map">
        {status === "loading" && (
          <Flex
            justifyContent="center"
            alignItems="center"
            height="80dvh"
            direction="column"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              size="xl"
              color="orange.500"
            />
            <Text
              textAlign="center"
              fontWeight="light"
              fontSize={["md", "md", "xl"]}
              mt={4}
            >
              Przygotowywanie mapy parkingów...
            </Text>
          </Flex>
        )}
      </div>
    </div>
  );
}
