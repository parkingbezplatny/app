import { TCreateParking } from "@/lib/types";
import { CreateParkingValidation } from "@/lib/validations/forms/createParking.validation";
import {
  Box,
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
import { useState } from "react";
import { useForm } from "react-hook-form";

function CreateParkingForm() {
  const [createParkingError, setCreateParkingError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCreateParking>({
    resolver: zodResolver(CreateParkingValidation),
    mode: "onChange",
    defaultValues: {
      geometry: {
        type: "Point",
      },
      type: "Feature",
    },
  });

  const createParking = async (values: TCreateParking) => {
    setCreateParkingError("");
    // TODO Call to API with values
    console.log(values);
    alert(values);
    setCreateParkingError("TODO Call to API with values");
  };

  return (
    <Stack spacing={4} w={{ base: 300, sm: 400 }}>
      {createParkingError && (
        <Box
          w="100%"
          p={4}
          border="1px"
          borderColor="red.400"
          rounded={10}
          color="red.600"
          fontWeight="semibold"
        >
          {createParkingError}
        </Box>
      )}
      <form onSubmit={handleSubmit(createParking)}>
        <Stack spacing={4} w={{ base: 300, sm: 400 }}>
          <FormControl id="type" isInvalid={!!errors.type}>
            <FormLabel fontSize="md">Typ</FormLabel>
            <Input
              placeholder="Wpisz typ"
              focusBorderColor="orange.400"
              {...register("type", {
                required: { value: true, message: "Typ jest wymagany" },
              })}
            />
            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
          </FormControl>

          <Divider my={4} borderBottom={"1px solid grey"} />

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

          <FormControl id="geometry.type" isInvalid={!!errors.geometry?.type}>
            <FormLabel fontSize="md">Typ</FormLabel>
            <Input
              placeholder="Wpisz typ"
              focusBorderColor="orange.400"
              {...register("geometry.type", {
                required: {
                  value: true,
                  message: "Typ jest wymagany",
                },
              })}
            />
            <FormErrorMessage>
              {
                // eslint-disable-next-line
                // @ts-ignore
                errors.geometry?.type?.message
              }
            </FormErrorMessage>
          </FormControl>

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

export default CreateParkingForm;
