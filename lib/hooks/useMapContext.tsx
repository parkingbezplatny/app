"use client";

import { useContext } from "react";
import { MapContext, MapContextProps } from "../context/mapContext";

export function useMapContext(): MapContextProps {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context;
}
