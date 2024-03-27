import { TPokemon, TStoredPokemons } from "./types/pokemon"
import { fetchData, fetchPokemonsById, updatePokemonList } from "./model"
import { showPokemonsCards, createPokemonListElement } from "./view"
import { DomActions } from "./nodeElementsConfig"

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

    let pokemonResults =  await fetchData(allPokemonsUrl)
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
    return pokemons.map(pokemon => fetchData(pokemon.url))
}

async function runPokemonApp(apiUrl:string) {
    let pokemonResults =  await fetchData(apiUrl)
    let allPokemons = await Promise.all(returnAllPokemonsPromise(pokemonResults.results))
    globalNextUrl = pokemonResults.next
    pokemonMainDiv && showPokemonsCards(pokemonMainDiv, allPokemons)
}

async function returnPokemonList() {
    const pokemons:TStoredPokemons[] = await fetchData("http://localhost:3000/pokemons");
    const pokemonPromises = fetchPokemonsById(pokemons)

    return await Promise.all(pokemonPromises)
}

async function init() {
    runPokemonApp(pokeApiUrl)
    loadMorePokemonsBtn && loadMorePokemonsBtn.addEventListener("click", () => runPokemonApp(globalNextUrl))
    filterPokemonsInput && filterPokemonsInput.addEventListener("keyup", (e) => {
        const target = e.target as HTMLInputElement; 
        const value = target.value;
        value && filterPokemonsByName(value)
    })
    const storedPokemons = await returnPokemonList() 
    storedPokemons.forEach((pokemon:TPokemon) => {
        createPokemonListElement(pokemon)
    })

    updatePokemonList(createPokemonListElement)
}

init()
DomActions.init();