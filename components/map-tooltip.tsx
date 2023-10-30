import React, { useState } from "react";
import { Box, IconButton, Text, Divider, HStack } from "@chakra-ui/react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

interface TooltipProps {
  name: string;
  city: string;
  coordinates: string;
}

const MapTooltip: React.FC<TooltipProps> = ({ name, city, coordinates }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleStarClick = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <Box p={5} w="225px" position="relative">
      <HStack justifyContent="space-between">
        <Text fontSize={20} fontWeight="bold" mb={4}>
          {name}
        </Text>
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
      <Text fontSize={15}>{city}</Text>
      <Divider w="210px" my={4} border="1px solid #E2E8F0" />
      <Text fontStyle="italic" color="grey">
        {coordinates}
      </Text>
    </Box>
  );
};

export default MapTooltip;
