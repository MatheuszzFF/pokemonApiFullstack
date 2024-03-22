import { TPokemon } from "./types/pokemon"

const pokeApiUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"
const allPokemonsUrl: string = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const pokemonMainDiv:HTMLDivElement | null = document.querySelector(".js-pokemons")
const loadMorePokemonsBtn:HTMLButtonElement | null = document.querySelector(".js-load-more-pokemons")
const filterPokemonsInput:HTMLInputElement | null = document.querySelector(".js-filterPokemons")
let globalNextUrl: string;

export async function fetchPokemonData(url:string) {
    let req = await fetch(url)
    let res = await req.json();
    return res
}

function createPokemonCard(pokemon:TPokemon) {
    let pokemonDiv:HTMLDivElement = document.createElement("div")
    let pokemonTitleTag:HTMLHeadingElement = document.createElement("h2")
    let pokemonImgTag:HTMLImageElement = document.createElement("img")

    pokemonDiv.classList.add("pokemonCard") 
    pokemonTitleTag.classList.add("title")

    pokemonImgTag.src = pokemon.sprites.front_default
    pokemonTitleTag.textContent = pokemon.name

    pokemonDiv.appendChild(pokemonImgTag)
    pokemonDiv.appendChild(pokemonTitleTag)
    pokemonDiv.addEventListener("click", () => {
        storePokemon(pokemon.name, pokemon.sprites.front_default)
    })
    return pokemonDiv
}

function returnAllPokemonsPromise(pokemons: TPokemon[]) {
    return pokemons.map(pokemon => {
        return fetchPokemonData(pokemon.url)
    })
}

async function filterPokemonsByName(value: string) {
    if(value.length === 0)  {
        if(pokemonMainDiv) {
            pokemonMainDiv.textContent = "";
        }
        runPokemonApp(pokeApiUrl)
    }

    if(value.length <= 3) return

    let pokemonResults =  await fetchPokemonData(allPokemonsUrl)
    let pokemonFiltered = [];

    pokemonFiltered = pokemonResults.results.filter((pokemon: any) => {
        return pokemon.name.includes(value.toLowerCase())
    })

    let allFilteredPokemons = await Promise.all(returnAllPokemonsPromise(pokemonFiltered))
    
    if(pokemonMainDiv) {
        pokemonMainDiv.textContent = "";
    }
    showPokemonsCards(allFilteredPokemons)
}

function showPokemonsCards(pokemons:TPokemon[]) {
    const DOMFragment = document.createDocumentFragment();

    const pokemonElements = pokemons.map(pokemon => {
        return createPokemonCard(pokemon)
    })

    pokemonElements.forEach((element) => DOMFragment.appendChild(element))
    if(pokemonMainDiv) {
        pokemonMainDiv.appendChild(DOMFragment)
    }
}

async function runPokemonApp(apiUrl:string) {
    let pokemonResults =  await fetchPokemonData(apiUrl)
    let allPokemons = await Promise.all(returnAllPokemonsPromise(pokemonResults.results))
    globalNextUrl = pokemonResults.next
    
    showPokemonsCards(allPokemons)
}

async function storePokemon(name: string, sprite: string) {
    try {
      const response = await fetch('http://localhost:3000/store-pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, sprite })
      });
  
      if (!response.ok) {
        throw new Error('Failed to store Pokemon');
      }
  
      console.log('Pokemon stored successfully!');
      console.log(await getAllStoredPokemons())
    } catch (error: any) {
      console.error('Error storing Pokemon:', error.message);
    }
}

async function getAllStoredPokemons() {
    const url = 'http://localhost:3000/pokemons'
    const req = await fetch(url)
    const res = await req.json();
    console.log(res)
} 

async function init() {
    runPokemonApp(pokeApiUrl)
    loadMorePokemonsBtn && loadMorePokemonsBtn.addEventListener("click", (e) => runPokemonApp(globalNextUrl))
    filterPokemonsInput && filterPokemonsInput.addEventListener("keyup", (e) => {
        const target = e.target as HTMLInputElement; 
        const value = target.value;
        value && filterPokemonsByName(value)
    })
}

init()