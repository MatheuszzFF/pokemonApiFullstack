import { storePokemon } from "./model"
import { TPokemon, TType } from "./types/pokemon"


function createTypesHTML (receivedTypes: TType[]) {
    return receivedTypes.map((theType) => {
        const typeName = theType.type.name;
        let nameFirstLetter = typeName.substring(0,1).toUpperCase();
        const formmatedName = nameFirstLetter + typeName.substring(1)
        
        return `
            <li class="type-icon ${typeName}">
                <img src="/assets/img/pokemon/types/icons/${typeName}.svg">
                <span class="tooltip">${formmatedName}</span>
            </li>
        `
    }).join(",")
}

function createPokemonHTML(element:HTMLDivElement, pokemon: TPokemon) {
    const {
        name,
        id,
        types,
        sprites
    } = pokemon

    let image = sprites.other.home.front_default ? 
    sprites.other.home.front_default 
    : sprites.versions['generation-vi']['x-y'].front_default;

    element.innerHTML = `
        <div class="top">
            <span>#${id}</span>
            <ul class="pokemon-types-card">
                ${createTypesHTML(types)}
            </ul>
        </div>
        <div class="radiusImage">
            <img src="${image}">
            <img class="shadow" src="${image}">
        </div>
        <div class="content">
            <h4>${name.substring(0,1).toUpperCase() + name.substring(1).replace("-", " ")}</h4>
        </div>
    `
}

function createPokemonCard(pokemon:TPokemon) {
    let pokemonDiv:HTMLDivElement = document.createElement("div")
    pokemonDiv.classList.add("pokemon__card")
    pokemonDiv.classList.add(`${pokemon.types[0].type.name}`)

    createPokemonHTML(pokemonDiv, pokemon)
    
    pokemonDiv.addEventListener("click", () => storePokemon(pokemon.id))
    return pokemonDiv
}

export function showPokemonsCards(mainDivElement: HTMLDivElement,pokemons:TPokemon[]) {
    const DOMFragment = document.createDocumentFragment();
    const pokemonElements = pokemons
    .map(pokemon => createPokemonCard(pokemon))

    pokemonElements.forEach((element) => DOMFragment.appendChild(element))
    mainDivElement && mainDivElement.appendChild(DOMFragment)
}


export function createPokemonListElement(pokemon: TPokemon) {
    const pokemonListElement: HTMLDivElement | null = document.querySelector(".js-pokemonList")
    console.log(pokemon)
    if(pokemonListElement) {
        pokemonListElement.innerHTML += `
            <li>${pokemon.name}</li>
        `
    }
}