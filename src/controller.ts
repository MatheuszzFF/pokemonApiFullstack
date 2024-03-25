import { TPokemon } from "./types/pokemon"
import { fetchPokemonData } from "./model"
import { showPokemonsCards } from "./view"

const pokeApiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=24&offset=0"
const allPokemonsUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const pokemonMainDiv:HTMLDivElement | null = document.querySelector(".js-pokemons")
const loadMorePokemonsBtn:HTMLButtonElement | null = document.querySelector(".js-load-more-pokemons")
const filterPokemonsInput:HTMLInputElement | null = document.querySelector(".js-filterPokemons")
let globalNextUrl: string;

async function filterPokemonsByName(value: string) {
    console.log(value.length)
    if(value.length === 0 )  {
        if(pokemonMainDiv) pokemonMainDiv.textContent = ""
        runPokemonApp(pokeApiUrl)
    }
    if(value.length <= 3) return

    let pokemonResults =  await fetchPokemonData(allPokemonsUrl)
    let pokemonFiltered = [];

    pokemonFiltered = pokemonResults.results.filter((pokemon: TPokemon) => {
        return pokemon.name.includes(value.toLowerCase())
    })

    let allFilteredPokemons = await Promise.all(returnAllPokemonsPromise(pokemonFiltered))
    
    if(pokemonMainDiv) {
        pokemonMainDiv.textContent = "";
    }
    pokemonMainDiv && showPokemonsCards(pokemonMainDiv,allFilteredPokemons)
}

function returnAllPokemonsPromise(pokemons: TPokemon[]) {
    return pokemons.map(pokemon => fetchPokemonData(pokemon.url))
}

async function runPokemonApp(apiUrl:string) {
    let pokemonResults =  await fetchPokemonData(apiUrl)
    let allPokemons = await Promise.all(returnAllPokemonsPromise(pokemonResults.results))
    globalNextUrl = pokemonResults.next
    pokemonMainDiv && showPokemonsCards(pokemonMainDiv, allPokemons)
}

function init() {
    runPokemonApp(pokeApiUrl)
    loadMorePokemonsBtn && loadMorePokemonsBtn.addEventListener("click", () => runPokemonApp(globalNextUrl))
    filterPokemonsInput && filterPokemonsInput.addEventListener("keyup", (e) => {
        const target = e.target as HTMLInputElement; 
        const value = target.value;
        value && filterPokemonsByName(value)
    })
}

init()