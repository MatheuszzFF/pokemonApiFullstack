export type TType = {
    slot: number
    type: {
        name: string
        url: string
    }
}
  
export type Sprites = any

export type TPokemon = {
    id: number;
    num: string;
    name: string;
    img: string;
    types: TType[];
    height: string;
    sprites: Sprites;
    url: string
}

export type TStoredPokemons = {
    id: number,
    pokemonId: number,
}