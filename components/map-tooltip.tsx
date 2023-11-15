import React, { useEffect, useState } from "react";
import { Box, IconButton, Text, Divider, HStack } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Address } from "@prisma/client";
import { getParkingById } from "@/lib/services/parking";

function MapTooltip({
  parkingId,
  parkingLabel,
}: {
  parkingId: number;
  parkingLabel: string;
}) {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleStarClick = () => {
    setIsFavourite(!isFavourite);
    alert(parkingId);
  };

  useEffect(() => {
    const fetch = async () => {
      const p = await getParkingById(parkingId.toString());
      console.log(p);
    };

    fetch();
  }, []);

  return (
    <Box p={5} w="225px" position="relative">
      <HStack justifyContent="space-between">
        <IconButton
          mt={-6}
          fontSize="25px"
          aria-label="Favourite icon"
          icon={isFavourite ? <AiFillStar /> : <AiOutlineStar />}
          color={isFavourite ? "#FFA500" : "grey"}
          variant="outline"
          onClick={handleStarClick}
        />
      </HStack>
      <Text fontSize={15}>{parkingLabel}</Text>
      {/* <Divider w="210px" my={4} border="1px solid #E2E8F0" />
      <Text fontStyle="italic" color="grey">
        {coordinates}
      </Text> */}
    </Box>
  );
}

export default MapTooltip;
