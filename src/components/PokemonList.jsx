import React, { useState, useEffect } from "react";
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
  const [nextPage, setNextPage] = useState(POKE_LIST_API_URL + "?limit=20");
  const [loadMore, setLoadMore] = useState(true);

  const fetchPokemon = async () => {
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
  };

  const updatePokemons = () => {
    const currentList = [...pokemonList];
    const items = currentList.map((item, index) => ({
      id: index + 1,
      name: item.name,
      imgUrl: `${POKE_SPRITES_API_URL}${index + 1}.png`,
    }));
    setPokemons(items);
  };

  useEffect(() => {
    fetchPokemon();
  }, []); // Fetch initial data

  useEffect(() => {
    updatePokemons();
  }, [pokemonList]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchPokemon();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPage]); // Add scroll event listener

  return (
    <div w={"100%"}>
      <h1>Pokemon List</h1>
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
