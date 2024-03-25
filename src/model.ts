import { TPokemon } from "./types/pokemon";
const POKE_API_BASE_URL = "https://pokeapi.co/api/v2"

export async function fetchData(url:string) {
    let req = await fetch(url)
    let res = await req.json();
    return res
}

export async function storePokemon(id: number) {
    try {
      const response = await fetch('http://localhost:3000/store-pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      });
      if (!response.ok) throw new Error('Failed to store Pokemon');
      const data = await response.json();
      console.log(data.message);
      if(data.alreadyHavePokemon) return
      
    } catch (error: any) {
      console.error('Error storing Pokemon:', error.message);
    }
}

export function fetchPokemonsById(pokemons: {id: number, pokemonId: number}[]) {
  return pokemons.map(async ({pokemonId}) => {
      const req = await fetch(`${POKE_API_BASE_URL}/pokemon/${pokemonId}`);
      const res = await req.json();
      return res
  })
}

export function updatePokemonList(callback: (pokemons: TPokemon) => void) {
  const ws = new WebSocket('ws://localhost:3000'); 
  console.log(ws)
  ws.onopen = (event) => {
    console.log("front end connection started")
  }
  
  ws.onmessage = async (event) => {
    const pokemonUpdated = JSON.parse(event.data)
    console.log({"updatedPokemon": pokemonUpdated})
    const pokemons = await Promise.all(fetchPokemonsById(pokemonUpdated))
    console.log(event)
    pokemons.forEach((pokemon: TPokemon) => {
      callback(pokemon)
    })
  }
}