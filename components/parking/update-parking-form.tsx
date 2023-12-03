import { useGetParking, useUpdateParking } from "@/lib/hooks/parkingHooks";
import { TParking, TUpdateParking } from "@/lib/types";
import { UpdateParkingValidation } from "@/lib/validations/forms/updateParking.validation";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  parkingId: number;
  onClose: () => void;
};

const mapParkingToUpdateParking = (parking: TParking): TUpdateParking => {
  const { coordinates } = parking.geometry;
  const { properties } = parking;
  return {
    geometry: {
      lat: coordinates[0].toString(),
      lng: coordinates[1].toString(),
    },
    properties: {
      address: {
        city: properties.address.city,
        countryName: properties.address.countryName,
        county: properties.address.county,
        label: properties.address.label,
        postalCode: properties.address.postalCode,
        state: properties.address.state,
        houseNumber: properties.address.houseNumber ?? undefined,
        street: properties.address.street ?? undefined,
      },
    },
  };
};

function UpdateParkingForm({ parkingId, onClose }: Props) {
  const [parkingDefaultValues, setParkingDefaultValues] =
    useState<TUpdateParking>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateParking>({
    resolver: zodResolver(UpdateParkingValidation),
    mode: "onChange",
    defaultValues: parkingDefaultValues,
  });

  const { data: parkingResponse } = useGetParking(parkingId.toString());

  useEffect(() => {
    if (parkingResponse?.data) {
      setParkingDefaultValues(mapParkingToUpdateParking(parkingResponse.data));
    }
  }, [parkingResponse]);

  const { mutate: updateParking } = useUpdateParking(onClose);

  const onSubmit = (data: TUpdateParking) => {
    updateParking({
      id: parkingId.toString(),
      updateParking: data,
    });
  };

  return (
    <Stack spacing={4} w={{ base: 300, sm: 400 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} w={{ base: 300, sm: 400 }}>
          <Heading size="md">Adres</Heading>
          <FormControl
            id="properties.address.countryName"
            isInvalid={!!errors.properties?.address?.countryName}
          >
            <FormLabel fontSize="md">Państwo</FormLabel>
            <Input
              placeholder="Wpisz państwo"
              focusBorderColor="orange.400"
              {...register("properties.address.countryName", {
                required: { value: true, message: "Państwo jest wymagane" },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.countryName?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.state"
            isInvalid={!!errors.properties?.address?.state}
          >
            <FormLabel fontSize="md">Województwo</FormLabel>
            <Input
              placeholder="Wpisz województwo"
              focusBorderColor="orange.400"
              {...register("properties.address.state", {
                required: { value: true, message: "Województwo jest wymagane" },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.state?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.county"
            isInvalid={!!errors.properties?.address?.county}
          >
            <FormLabel fontSize="md">Powiat</FormLabel>
            <Input
              placeholder="Wpisz powiat"
              focusBorderColor="orange.400"
              {...register("properties.address.county", {
                required: { value: true, message: "Województwo jest wymagany" },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.county?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.postalCode"
            isInvalid={!!errors.properties?.address?.postalCode}
          >
            <FormLabel fontSize="md">Kod pocztowy</FormLabel>
            <Input
              placeholder="Wpisz kod pocztowy"
              focusBorderColor="orange.400"
              {...register("properties.address.postalCode", {
                required: {
                  value: true,
                  message: "Kod pocztowy jest wymagany",
                },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.postalCode?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.city"
            isInvalid={!!errors.properties?.address?.city}
          >
            <FormLabel fontSize="md">Miasto</FormLabel>
            <Input
              placeholder="Wpisz miasto"
              focusBorderColor="orange.400"
              {...register("properties.address.city", {
                required: {
                  value: true,
                  message: "Miasto jest wymagane",
                },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.city?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.street"
            isInvalid={!!errors.properties?.address?.street}
          >
            <FormLabel fontSize="md">Ulica (opcjonalnie)</FormLabel>
            <Input
              placeholder="Wpisz ulicę"
              focusBorderColor="orange.400"
              {...register("properties.address.street", {})}
            />
            <FormErrorMessage>
              {errors.properties?.address?.street?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.houseNumber"
            isInvalid={!!errors.properties?.address?.houseNumber}
          >
            <FormLabel fontSize="md">Numer (opcjonalnie)</FormLabel>
            <Input
              placeholder="Wpisz numer"
              focusBorderColor="orange.400"
              {...register("properties.address.houseNumber")}
            />
            <FormErrorMessage>
              {errors.properties?.address?.houseNumber?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="properties.address.label"
            isInvalid={!!errors.properties?.address?.label}
          >
            <FormLabel fontSize="md">Label</FormLabel>
            <Input
              placeholder="Wpisz label"
              focusBorderColor="orange.400"
              {...register("properties.address.label", {
                required: {
                  value: true,
                  message: "Label jest wymagany",
                },
              })}
            />
            <FormErrorMessage>
              {errors.properties?.address?.label?.message}
            </FormErrorMessage>
          </FormControl>

          <Divider my={4} borderBottom={"1px solid grey"} />

          <Heading size="md">Geometria</Heading>

          <FormControl id="geometry.lat" isInvalid={!!errors.geometry?.lat}>
            <FormLabel fontSize="md">Lat</FormLabel>
            <Input
              type="number"
              step="any"
              placeholder="Wpisz lat"
              focusBorderColor="orange.400"
              {...register("geometry.lat", {
                required: {
                  value: true,
                  message: "Lat jest wymagane",
                },
              })}
            />
            <FormErrorMessage>{errors.geometry?.lat?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="geometry.lng" isInvalid={!!errors.geometry?.lng}>
            <FormLabel fontSize="md">Lng</FormLabel>
            <Input
              type="number"
              step="any"
              placeholder="Wpisz lng"
              focusBorderColor="orange.400"
              {...register("geometry.lng", {
                required: {
                  value: true,
                  message: "Lng jest wymagane",
                },
              })}
            />
            <FormErrorMessage>{errors.geometry?.lng?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            mt={2}
            bg="orange.500"
            _hover={{
              bg: "#C05621",
            }}
            textColor="white"
            isLoading={isSubmitting}
          >
            Zapisz
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default UpdateParkingForm;
