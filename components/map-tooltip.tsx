import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Text,
  HStack,
  Divider,
  Spinner,
  Flex,
  ChakraProvider,
} from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Session } from "next-auth";

type MapTooltipProps = {
  parkingId: number | undefined;
  parkingLabel: string | undefined;
  parkingCoordinates: number[] | undefined;
  session: Session | null;
  addParkingToFavorite: (parkingId: number) => Promise<void>;
  removeParkingFromFavorite: (parkingId: number) => Promise<void>;
  // handleSetPopupUpdate: () => void;
};

function MapTooltip({
  parkingId,
  parkingLabel,
  parkingCoordinates,
  removeParkingFromFavorite,
  addParkingToFavorite,
  session, // handleSetPopupUpdate,
}: MapTooltipProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleStarClick = () => {
    if (
      session?.user.favoriteParkings?.find(
        (parking) => parking.parkingId === parkingId
      )
    ) {
      setIsLoading(true);
      removeParkingFromFavorite(parkingId!);
      // handleSetPopupUpdate();
      return;
    }
    setIsLoading(true);
    addParkingToFavorite(parkingId!);
    // handleSetPopupUpdate();
  };

  const formattedCoordinates = parkingCoordinates!
    .map((coord) => coord.toFixed(6))
    .join(" ");

  return (
    <Flex px="5px" w="225px">
      <Flex w="100%" justify="space-between" gap="1rem">
        <Box flex="9">
          <Text fontSize={15}>{parkingLabel}</Text>
          <Divider my={4} border="1px solid #E2E8F0" />
          <Text fontStyle="italic" color="grey">
            {formattedCoordinates}
          </Text>
        </Box>
        <Box flex="1">
          <Flex w="100%" align="center" justify="center">
            {isLoading ? (
              <IconButton
                fontSize="25px"
                aria-label="Loading"
                icon={<Spinner w="25px" h="25px" />}
              />
            ) : (
              <IconButton
                fontSize="25px"
                aria-label="Favourite icon"
                icon={
                  session?.user.favoriteParkings?.find(
                    (parking) => parking.parkingId === parkingId
                  ) ? (
                    <AiFillStar />
                  ) : (
                    <AiOutlineStar />
                  )
                }
                color={
                  session?.user.favoriteParkings?.find(
                    (parking) => parking.parkingId === parkingId
                  )
                    ? "#FFA500"
                    : "grey"
                }
                variant="ghost"
                onClick={handleStarClick}
              />
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default MapTooltip;
