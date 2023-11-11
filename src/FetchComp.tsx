import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Row, Col, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { POKEMONS_QUERY } from "./api/endpoints";

type Props = {};

const imgEndpoint = "https://raw.githubusercontent.com/PokeAPI/sprites/master/";
const maxIdGif = 650;

const pokemonQuery = gql`
  ${POKEMONS_QUERY}
`;

// const POKEMONS_QUERY = gql`
//   {
//     pokemon_v2_evolutionchain {
//       id
//       pokemon_v2_pokemonspecies(order_by: { id: asc }) {
//         id
//         name
//         pokemon_v2_pokemons {
//           height
//           weight
//           pokemon_v2_pokemonstats {
//             base_stat
//             pokemon_v2_stat {
//               name
//             }
//           }
//           pokemon_v2_pokemontypes {
//             slot
//             pokemon_v2_type {
//               name
//             }
//           }
//           pokemon_v2_pokemonsprites {
//             sprites
//           }
//         }
//       }
//     }
//   }
// `;

const FetchComp: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [evolutionChainId, setEvolutionChainId] = useState<number[]>([]);
  const [hoverId, setHoverId] = useState<number>();

  const ref = useRef(null);

  const allData = useQuery(pokemonQuery, {
    // pollInterval: 60000,
  });

  const fetchAPI = () => {
    allData.refetch();
  };

  let originalSprite =
    allData?.data?.pokemon_v2_evolutionchain[0]?.pokemon_v2_pokemonspecies[0]
      ?.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites;
  let jsonSprite = originalSprite && JSON?.parse(originalSprite);

  const getSrcImg = (urlPrefix: string, mediaStr: string) => {
    return mediaStr.replace("/media/", urlPrefix);
  };

  useEffect(() => {
    if (allData?.data) {
      console.log("allData", allData?.data);

      let dataScopeIndex = 328;
      let dataScope =
        allData?.data?.pokemon_v2_evolutionchain?.[dataScopeIndex]
          .pokemon_v2_pokemonspecies[0].pokemon_v2_pokemons[0]
          .pokemon_v2_pokemonsprites[0].sprites;
      // let dataScope = allData?.data?.pokemon_v2_evolutionchain[dataScopeIndex]

      let idArr: number[] = [];
      // allData.data.pokemon_v2_evolutionchain.forEach((item: any) => {
      //   console.log('allData.data.forEach', item)
      //   idArr.push(item.id)
      // })
      for (let i = 1; i <= 1000; i++) {
        idArr.push(i);
      }
      setEvolutionChainId(idArr);
    }
  }, [allData?.data]);

  useEffect(() => {
    jsonSprite?.front_default &&
      console.log(
        "jsonSprite",
        getSrcImg(imgEndpoint, jsonSprite.front_default)
      );
    jsonSprite && console.log("jsonSprite_all", jsonSprite);
  }, [jsonSprite]);

  let pokemonIdArr = [1, 2, 3];

  useEffect(() => {
    ref && console.log("ref", ref);
  }, [ref]);

  useEffect(() => {
    console.log("test.img");
    fetch(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
    ).then((res) => console.log("fetch.img", res));
  }, []);

  // if (allData.loading) return "Loading...";
  // if (allData.error) return <pre>{allData.error.message}</pre>;

  return (
    <div
      style={{
        border: "1px solid white",
        // width: '100%',
      }}
    >
      <div>
        <button onClick={() => fetchAPI()}>Fetch API</button>
      </div>

      {/* <Row>
        <Col span={4}>
          <Card
            style={{
              aspectRatio: 1,
              display: "grid",
              placeItems: "center",
            }}
            bodyStyle={{
              width: "100%",
              padding: 0,
            }}
          >
            <img
              // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${list}.svg`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${3}.gif`}
              ref={ref}
              style={{
                width: "80%",
              }}
            />
          </Card>
        </Col>
      </Row> */}

      <Row style={{ minWidth: "80vw" }} gutter={[8, 8]}>
        {allData?.data?.pokemon_v2_evolutionchain?.map(
          (list: any, index: number) => {
            let pokemonDataFocus = list.pokemon_v2_pokemonspecies[0];
            let pokemonId = pokemonDataFocus.id;

            // const [hoverCard, setHoverCard] = useState<boolean>(false)

            if (index > 10) return;
            return (
              <Col span={3} key={pokemonId}>
                <Card
                  style={{
                    aspectRatio: 1,
                    display: "grid",
                    placeItems: "center",
                  }}
                  bodyStyle={{
                    width: "100%",
                    padding: 0,
                  }}
                  onClick={() => {
                    // navigate(`/pokemon-chain/${list.id}`)
                    navigate(`/pokemon-chain/${index}`);
                  }}
                  // onMouseOver={() => setHoverCard(true)}
                  // onMouseOut={() => setHoverCard(false)}
                  onMouseOver={() => setHoverId(pokemonId)}
                  onMouseOut={() => setHoverId(undefined)}
                >
                  <img
                    key={list.id}
                    // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
                    // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`}
                    // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                    src={
                      // hoverCard
                      hoverId === pokemonId && pokemonId < maxIdGif
                        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonId}.gif`
                        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
                    }
                    style={{
                      // width: "50%",
                      // width: hoverCard ? '50%' : '80%'
                      width: hoverId === pokemonId ? "50%" : "80%",
                      // aspectRatio: 1,
                    }}
                  />
                  <Row>
                    <b>{pokemonDataFocus.name}</b>
                  </Row>
                </Card>
              </Col>
            );
          }
        )}
      </Row>
    </div>
  );
};

export default FetchComp;
