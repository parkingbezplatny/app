import React, { useState } from "react";
import { Box, IconButton, Text, HStack, Divider } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function MapTooltip({
  parkingId,
  parkingLabel,
  parkingCoordinates,
}: {
  parkingId: number;
  parkingLabel: string;
  parkingCoordinates: [number, number];
}) {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleStarClick = () => {
    setIsFavourite(!isFavourite);
    alert(parkingId);
  };

  const formattedCoordinates = parkingCoordinates
    .map((coord) => coord.toFixed(6))
    .join(" ");

  return (
    <Box px={5} w="225px" position="relative">
      <HStack justifyContent="space-between">
        <IconButton
          position="absolute"
          top={-4}
          right={2}
          fontSize="25px"
          aria-label="Favourite icon"
          icon={isFavourite ? <AiFillStar /> : <AiOutlineStar />}
          color={isFavourite ? "#FFA500" : "grey"}
          variant="outline"
          onClick={handleStarClick}
        />
      </HStack>
      <Text mr={20} fontSize={15}>{parkingLabel}</Text>
      <Divider w="210px" my={4} border="1px solid #E2E8F0" />
      <Text fontStyle="italic" color="grey">
        {formattedCoordinates}
      </Text>
    </Box>
  );
}

export default MapTooltip;
