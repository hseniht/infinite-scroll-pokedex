import React, { useState, useEffect } from "react";
import {
  POKE_LIST_API_URL,
  POKE_SPRITES_API_URL,
} from "../constants/constants";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState(POKE_LIST_API_URL + "?limit=5");
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
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.imgUrl} />
          </li>
        ))}
      </ul>
      {loadMore && <button onClick={fetchPokemon}>Load more</button>}
    </div>
  );
};

export default PokemonList;
