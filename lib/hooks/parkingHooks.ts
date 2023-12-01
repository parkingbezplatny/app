import { Parking } from "@/components/sidepanel";
import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { ApiResponse } from "../helpers/server-function-response";
import { TParking } from "../types";

function getParkings() {
    return agent.Parkings.list();
  }

function mapParkings(response: ApiResponse<TParking[] | null>) {
    let parking: Parking[] = [];
    if (response.success && response.data) {
        parking = response.data.map((parking) => {
            return {
                name: parking.properties.address.label,
                coordinates: {
                  lat: parking.geometry.coordinates[0],
                  lng: parking.geometry.coordinates[1],
                },
                city: parking.properties.address.city,
              };
        });
    }
    return parking;
  }

export const useGetAllParkings = () => {
    return useQuery({
        queryKey: ["parkings"],
        queryFn: getParkings,
        select: mapParkings,
      });
}
