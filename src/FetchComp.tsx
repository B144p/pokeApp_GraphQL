import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

type Props = {};

const imgEndpoint = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/'

const POKEMONS_QUERY = gql`
  {
    pokemon_v2_evolutionchain {
      id
      pokemon_v2_pokemonspecies(order_by: {id: asc}) {
        id
        name
        pokemon_v2_pokemons {
          height
          weight
          pokemon_v2_pokemonstats {
            base_stat
            pokemon_v2_stat {
              name
            }
          }
          pokemon_v2_pokemontypes {
            slot
            pokemon_v2_type {
              name
            }
          }
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
    }
  }
`;

const FetchComp: React.FC<Props> = () => {
  const [evolutionChainId, setEvolutionChainId] = useState<number[]>([])
  
  const allData = useQuery(POKEMONS_QUERY, {
    // pollInterval: 60000,
  });

  const fetchAPI = () => {
    allData.refetch();
  };

  let originalSprite = allData?.data?.pokemon_v2_evolutionchain[0]?.pokemon_v2_pokemonspecies[0]?.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites
  let jsonSprite = originalSprite && JSON?.parse(originalSprite)
  
  const getSrcImg = (urlPrefix: string, mediaStr: string) => {
    return mediaStr.replace('/media/', urlPrefix)
  }
  
  useEffect(() => {
    if (allData?.data) {
      console.log("allData", allData?.data);
      let idArr: number[] = []
      // allData.data.pokemon_v2_evolutionchain.forEach((item: any) => {
      //   console.log('allData.data.forEach', item)
      //   idArr.push(item.id)
      // })
      for (let i = 1; i <= 1000; i++) {
        idArr.push(i)
      }
      setEvolutionChainId(idArr)
    }
  }, [allData?.data]);
  
  useEffect(() => {
    jsonSprite?.front_default && console.log('jsonSprite', getSrcImg(imgEndpoint, jsonSprite.front_default))
  }, [jsonSprite])

  //   if (allData.loading) return "Loading...";
  //   if (allData.error) return <pre>{allData.error.message}</pre>;

  let pokemonIdArr = [1, 2, 3];

  return (
    <>
      <div>
        <button
          onClick={() => fetchAPI()}
        >
          Fetch API
        </button>
      </div>

      {pokemonIdArr.map((id: number) => (
        <img
          key={id}
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`}
        />
      ))}
    </>
  );
};

export default FetchComp;
