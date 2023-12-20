import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  POKE_LIST_API_URL,
  POKE_SPRITES_API_URL,
} from "../constants/constants";
import { PokeCard } from "./PokeCard";
import { Container, Flex, SimpleGrid, Center } from "@chakra-ui/react";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState(POKE_LIST_API_URL + "?limit=18");
  const [loadMore, setLoadMore] = useState(true);

  const fetchPokemon = useCallback(async () => {
    try {
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
          console.log("debug: scroll to bottom");
          fetchPokemon();
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
    <div id="PokeList" w={"100%"} ref={containerRef}>
      {/* <h1>Pokemon List</h1> */}
      <SimpleGrid
        as="ul"
        // columns={4}
        // columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        w="60%"
        // w={{ base: "80%", sm: "100%", md: "60%" }}
        m="0 auto"
        minChildWidth="140px"
        // justifyContent="center"
        spacing={4}
        // spacing={"10px"}
      >
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.name}
            name={pokemon.name}
            imgSrc={pokemon.imgUrl}
          />
        ))}
      </SimpleGrid>
      {loadMore && <button onClick={fetchPokemon}>Load more</button>}
    </div>
  );
};

export default PokemonList;
