import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POKEMONS_QUERY } from "../../../api/endpoints";
import { gql, useQuery } from "@apollo/client";
import { Row, Col, Spin, Space } from "antd";

type Props = {};

type ParamTypes = Record<string, any>;

type IPokemonStat = {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
};

type IPokemonType = {
  slot: number;
  pokemon_v2_type: {
    name: string;
  };
};

type IPokemonDetail = {
  weight: number;
  height: number;
  pokemon_v2_pokemonsprites: ParamTypes;
  pokemon_v2_pokemonstats: IPokemonStat[];
  pokemon_v2_pokemontypes: IPokemonType[];
};

type IPokemonData = {
  id: number;
  name: string;
  pokemon_v2_pokemons: IPokemonDetail[];
};

type IStat = {
  name: string;
  base_stat: number;
};

type IOverallStatus = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemonStat: IStat[];
  pokemonType: string[];
};

const pokemonQuery = gql`
  ${POKEMONS_QUERY}
`;
const focusPokemonCol = 10;
const statusPokemonCol = 7;

const PokemonView: React.FC<Props> = () => {
  const { id } = useParams();
  const { data } = useQuery(pokemonQuery);

  const [chainDataFocus, setChainDataFocus] = useState<any>();
  const [pokemonFocus, setPokemonFocus] = useState<IPokemonData>();
  const [overallStatus, setOverallStatus] = useState<IOverallStatus>();

  console.log("allData.firstPage", data);

  useEffect(() => {
    if (data && id) {
      setChainDataFocus(data.pokemon_v2_evolutionchain[id]);
    }
  }, [data?.pokemon_v2_evolutionchain, id]);

  useEffect(() => {
    if (chainDataFocus) {
      setPokemonFocus(chainDataFocus.pokemon_v2_pokemonspecies[0]);
    }
  }, [chainDataFocus]);

  useEffect(() => {
    if (pokemonFocus) {
      const { id, name, pokemon_v2_pokemons } = pokemonFocus;
      const {
        height,
        weight,
        pokemon_v2_pokemonstats,
        pokemon_v2_pokemontypes,
      } = pokemon_v2_pokemons[0];
      let pokemonStat = pokemon_v2_pokemonstats.map((item) => ({
        name: item.pokemon_v2_stat.name,
        base_stat: item.base_stat,
      }));
      let pokemonType = pokemon_v2_pokemontypes.map(
        (item) => item.pokemon_v2_type.name
      );
      setOverallStatus({
        id,
        name,
        weight: weight / 10,
        height: height / 10,
        pokemonStat,
        pokemonType,
      });
    }
  }, [pokemonFocus]);

  useEffect(() => {
    console.log("overallStatus", overallStatus);
  }, [overallStatus]);

  // let leftStatusLabel = [
  //   'Id : #',
  //   'Height : '
  // ]
  // let leftStatusKey = ['id', ]

  return (
    <Spin spinning={!chainDataFocus}>
      <div>PokemonView: {id}</div>
      <Row
        style={{
          height: 100,
        }}
      >
        <Col span={statusPokemonCol} style={{ border: "1px solid white" }}>
          <Space direction="vertical">
            <b>Id: #{overallStatus?.id}</b>
            <b>Name: {overallStatus?.name}</b>
            <b>Height: {overallStatus?.height} (m)</b>
            <b>Weight: {overallStatus?.weight} (kg)</b>
            <b>Type: {overallStatus?.pokemonType}</b>
          </Space>
        </Col>
        <Col span={focusPokemonCol} style={{ border: "1px solid white" }}>
          {pokemonFocus && (
            <img
              src={
                pokemonFocus &&
                `
                https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonFocus.id}.png
              `
              }
              style={{
                width: "80%",
              }}
            />
          )}
        </Col>
        <Col span={statusPokemonCol} style={{ border: "1px solid white" }}>
          <Space direction="vertical">
            {overallStatus?.pokemonStat?.map((stat) => (
              <Row key={stat.name} gutter={8} justify="space-between">
                <Col>
                  <b>{stat.name}</b>
                </Col>
                <Col>
                  <b>{stat.base_stat}</b>
                </Col>
              </Row>
            ))}
          </Space>
        </Col>
      </Row>
      <Row></Row>
    </Spin>
  );
};

export default PokemonView;
