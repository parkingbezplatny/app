import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

function getParkings() {
    return agent.Parkings.list();
  }

export const useGetAllParkings = () => {
    return useQuery({
        queryKey: ["parkings"],
        queryFn: getParkings,
      });
}