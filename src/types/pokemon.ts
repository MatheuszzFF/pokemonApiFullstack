export type TType = {
    Bug: "Bug",
    Dark: "Dark",
    Dragon: "Dragon",
    Electric: "Electric",
    Fairy: "Fairy",
    Fighting: "Fighting",
    Fire: "Fire",
    Flying: "Flying",
    Ghost: "Ghost",
    Grass: "Grass",
    Ground: "Ground",
    Ice: "Ice",
    Normal: "Normal",
    Poison: "Poison",
    Psychic: "Psychic",
    Rock: "Rock",
    Steel: "Steel",
    Water: "Water",
}

export type Sprites = {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export type TPokemon = {
    id: number;
    num: string;
    name: string;
    img: string;
    type: TType[];
    height: string;
    sprites: Sprites;
    url: string
}