import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function CountryCard({ item }) {
  const filteredCountry = {
    name: item.name.common,
    currency: Object.values(item.currencies)
      .map((c) => c.name)
      .join(", "),
    capital: item.capital ? item.capital[0] : "Capital detail not available",
    languages: item.languages
      ? Object.values(item.languages).join(", ")
      : "Languages not available",
    flag: `https://flagsapi.com/${item.cca2}/flat/64.png`,
  };
  const { favoriteList, setFavoriteList } = useContext(DataContext);

  const handelClick = (item) => {
    setFavoriteList([...favoriteList, item]);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      w="250px"
      boxShadow="lg"
      transition="transform 0.2s, box-shadow 0.2s"
      _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
    >
      <Box mb="4" textAlign="center">
        <Image
          src={filteredCountry.flag}
          alt={`Flag of ${filteredCountry.name}`}
          mb="4"
          borderRadius="md"
          boxShadow="sm"
        />
        <Text fontSize="xl" fontWeight="bold" mb="2">
          {filteredCountry.name}
        </Text>
        <Text fontSize="md" color="gray.600" mb="2" maxW="200px" isTruncated>
          {filteredCountry.currency}
        </Text>
        <Text fontSize="md" color="gray.600" mb="2" maxW="200px" isTruncated>
          {filteredCountry.capital}
        </Text>
        <Text fontSize="md" color="gray.600" mb="4" maxW="200px" isTruncated>
          {filteredCountry.languages}
        </Text>
      </Box>
      <Button
        colorScheme="teal"
        onClick={() => handelClick(item)}
        _hover={{ bg: "teal.500", transform: "translateY(-2px)" }}
      >
        Add To Favorite
      </Button>
    </Box>
  );
}

export { CountryCard };
