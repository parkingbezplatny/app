"use client";

import React, { createContext, useState, ReactNode } from "react";

export interface MapContextProps {
  selectedPointOnMap: number[];
  mapNode: ReactNode | null;
  handleSetMapNode: (map: ReactNode) => void;
  handleSetSelectedPointOnMap: (point: number[]) => void;
}

export interface MapProviderProps {
  children: ReactNode;
}

export const MapContext = createContext<MapContextProps | undefined>(undefined);

export function MapContextProvider({ children }: MapProviderProps) {
  const [mapNode, setMapNode] = useState<ReactNode | null>(null);
  const [selectedPointOnMap, setSelectedPointOnMap] = useState<number[]>([
    19.0, 51.5,
  ]);

  const handleSetMapNode = (map: ReactNode) => {
    setMapNode(map);
  };

  const handleSetSelectedPointOnMap = (point: number[]) => {
    setSelectedPointOnMap(point);
  };

  const contextValues: MapContextProps = {
    mapNode,
    handleSetMapNode,
    selectedPointOnMap,
    handleSetSelectedPointOnMap,
  };

  return (
    <MapContext.Provider value={contextValues}>{children}</MapContext.Provider>
  );
}
