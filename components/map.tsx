import React, { useRef, useEffect, useState } from "react";
import maplibregl, { Map as MapLibreGL } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibreGL | null>(null);
  const [lng] = useState(21.017532);
  const [lat] = useState(52.237049);
  const [zoom] = useState(10);
  const [API_KEY] = useState("7DCB101n4xSSpVKQsBTg");

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

// import React, { useEffect } from "react";
// import maplibregl from "maplibre-gl";

// export default function Map() {
//   useEffect(() => {
//     const map = new maplibregl.Map({
//       container: "map", // the HTML element where the map will be displayed
//       style:
//         "https://api.maptiler.com/maps/streets-v2/style.json?key=7DCB101n4xSSpVKQsBTg", // the map style
//       center: [-74.006, 40.7128], // initial map center
//       zoom: 12, // initial zoom level
//     });

//     return () => {
//       // Cleanup the map when the component unmounts
//       map.remove();
//     };
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return <div id="map" style={{ width: "100%", height: "80%" }}></div>;
// }
