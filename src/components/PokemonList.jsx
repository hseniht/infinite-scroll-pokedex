import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  POKE_LIST_API_URL,
  POKE_SPRITES_API_URL,
} from "../constants/constants";
import { PokeCard } from "./PokeCard";
import {
  Container,
  Flex,
  SimpleGrid,
  Center,
  Spinner,
  Button,
  Box,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState(POKE_LIST_API_URL + "?limit=18");
  const [loadMore, setLoadMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = useCallback(async () => {
    try {
      setLoading(true);
      if (nextPage === null) {
        // Handle case when there is no more data
        console.warn("Empty response or null results");
        setLoadMore(false);
        return;
      }

      const response = await axios.get(nextPage);
      const results = response.data.results;

      setPokemonList((prevList) => [...prevList, ...results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error("Error 'catching' Pokemon:", error);
    } finally {
      setLoading(false);
    }
  }, [nextPage, setLoadMore, setPokemonList]);

  const updatePokemons = () => {
    const currentList = [...pokemonList];
    const items = currentList.map((item, index) => ({
      id: index + 1,
      name: item.name,
      imgUrl: `${POKE_SPRITES_API_URL}${index + 1}.png`,
    }));
    setPokemons(items);
  };

  const containerRef = useRef();

  useEffect(() => {
    fetchPokemon();
  }, []); // Fetch initial data

  useEffect(() => {
    updatePokemons();
  }, [pokemonList]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;

      if (container) {
        const isAtBottom =
          container.scrollTop + container.clientHeight ===
          container.scrollHeight;

        if (isAtBottom) {
          // Handle reaching the bottom of the scroll
          console.log("debug: scroll to bottomm");
          fetchPokemon();
          if (!loading) {
            // avoid debouncing
            container.removeEventListener("scroll", handleScroll);
          }
        }
      }
    };

    const container = containerRef.current;

    if (container) {
      //if exist
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchPokemon]);

  return (
    <Box id="PokeList" ref={containerRef} p={4}>
      {/* <h1>Pokemon List</h1> */}
      <SimpleGrid as="ul" w="60%" m="0 auto" minChildWidth="140px" spacing={4}>
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.name}
            name={pokemon.name}
            imgSrc={pokemon.imgUrl}
          />
        ))}
      </SimpleGrid>
      <Flex
        alignItems={"center"}
        flexDirection={"column"}
        p={4}
        gap={4}
        justifyContent={"space-between"}
      >
        {loading && <Spinner size="lg" thickness="3px" speed="0.65s" />}
        {loadMore && (
          <Button hidden={loading} onClick={fetchPokemon}>
            Load more
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default PokemonList;
