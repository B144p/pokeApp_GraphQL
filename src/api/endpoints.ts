export const POKEMONS_QUERY = `
  {
    pokemon_v2_evolutionchain {
      id
      pokemon_v2_pokemonspecies(order_by: { id: asc }) {
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