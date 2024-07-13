import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Input, useToast } from "@chakra-ui/react";
import { CountryCard } from "../components/CountryCard";
import { DataContext } from "../context/DataContext";

const Home = () => {
  const [searchData, setSearchData] = useState("");

  const { dataList, setDataList, historyList, setHistoryList } =
    useContext(DataContext);

  const searchInputBox = useRef(null);
  const toast = useToast();

  useEffect(() => {
    searchInputBox.current.focus();
  }, []);

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const fetchCountryData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    let id = null;
    if (searchData !== "") {
      id = setTimeout(() => {
        const newHistory = [...historyList];

        if (newHistory.length >= 5) {
          newHistory.pop();
        }
        newHistory.unshift(searchData);

        setHistoryList(newHistory);
        fetchCountryData(
          `https://restcountries.com/v3.1/currency/${searchData}`
        );
      }, 600);
    }
    return () => clearInterval(id);
  }, [searchData]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mt={"80px"}
        p={{ base: "10px", md: "20px" }}
        bg="gray.50"
        borderRadius="md"
        boxShadow="lg"
      >
        <Box w={{ base: "90%", md: "50%" }}>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search By Currency Code..."
            ref={searchInputBox}
            value={searchData}
            onChange={handleChange}
            p={4}
            borderRadius="md"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500" }}
            boxShadow="sm"
          />
        </Box>
      </Box>
      {dataList.length === 0 ? (
        <Flex
          align={"center"}
          direction={"column"}
          justifyContent={"center"}
          mt={"20px"}
        >
        
        </Flex>
      ) : (
        <Flex wrap={"wrap"} gap={"20px"} mt={"20px"} p={{ base: "10px", md: "50px" }}>
          {dataList &&
            dataList.length > 0 &&
            dataList.map((item, index) => {
              return <CountryCard key={index} item={item} />;
            })}
        </Flex>
      )}
    </>
  );
};

export { Home };
