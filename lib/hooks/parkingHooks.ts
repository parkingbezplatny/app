import { useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";
import { ApiResponse } from "../helpers/server-function-response";
import { TParking, TUpdateParking } from "../types";

function getParkings() {
  return agent.Parkings.list();
}

function mapParkings(response: ApiResponse<TParking[] | null>) {
  let parking: TParking[] = [];
  if (response.success && response.data) {
    parking = response.data.map((parking) => {
      return {
        ...parking,
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
    const { data, status } = useQuery({
      queryKey: ["parkings"],
      queryFn: getParkings,
      select: mapParkings,
    });
  
    const isLoading = status === 'loading';
  
    return { data, isLoading };
  }

function deleteParking(id: string) {
  return agent.Parkings.delete(id);
}

export const useDeleteParking = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: deleteParking,
    onSuccess: onSuccess,
  });
};

function updateParking({
  id,
  updateParking,
}: {
  id: string;
  updateParking: TUpdateParking;
}) {
  return agent.Parkings.update(id, updateParking);
}

export const useUpdateParking = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: updateParking,
    onSuccess: onSuccess,
  });
};

function getParking(id: string) {
  return agent.Parkings.details(id);
}

export const useGetParking = (id: string) => {
  return useQuery({
    queryKey: ["parking", id],
    queryFn: () => getParking(id),
  });
};

function getParkingsForMap() {
  return agent.Parkings.listForMap();
}

export const useGetParkingsForMap = () => {
  return useQuery({
    queryKey: ["parkingsForMap"],
    queryFn: () => getParkingsForMap(),
  });
};
