"use client";

import useDebounce from "@/lib/hooks/useDebounce";
import { TParking } from "@/lib/types";
import { Box, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

function Search({
  setSelectedPointOnMap,
}: {
  setSelectedPointOnMap: Dispatch<SetStateAction<number[]>>;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchParkings, setSearchParkings] = useState<TParking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const [error, setError] = useState<string | null>(null);

  const getParkings = async () => {
    setLoading(true);
    setError(null);
    if (!debouncedInputValue) {
      setSearchParkings([]);
      setLoading(false);
      return;
    }
    await axios
      .get(`/parkings?city=${debouncedInputValue}`)
      .then((res) => {
        setSearchParkings(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    setLoading(false);
  };

  useEffect(() => {
    const fetch = async () => {
      await getParkings();
    };
    fetch();
  }, [debouncedInputValue]);

  return (
    <Box>
      <Flex direction="column">
        <Box>
          <Heading as="h3" size="md" mb={4}>
            Wyszukaj
          </Heading>
          <Input
            placeholder="Wyszukaj parking..."
            borderColor="#d8dce4"
            focusBorderColor="orange.500"
            mb={5}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Box>
        {loading ? (
          <Flex justify="center" align="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <Text mt={-1} textAlign="center">{error}</Text>
        ) : (
          <Box
            rounded="md"
            border={searchParkings.length > 0 ? "1px solid #d8dce4" : "none"}
            px={2}
            maxH="50vh"
            overflowY="auto"
          >
            {searchParkings.map((parking) => (
              <Flex
                key={parking.id}
                py="0.75rem"
                borderBottom="1px"
                borderColor="#d8dce4"
                _last={{ borderBottom: "none" }}
              >
                <Box
                  w="full"
                  p="0.2rem"
                  cursor="pointer"
                  _hover={{ backgroundColor: "#dddddd" }}
                  onClick={() => {
                    setSelectedPointOnMap([
                      parking.geometry.coordinates[0],
                      parking.geometry.coordinates[1],
                    ]);
                  }}
                >
                  {parking.properties.address.label}
                </Box>
              </Flex>
            ))}
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Search;
