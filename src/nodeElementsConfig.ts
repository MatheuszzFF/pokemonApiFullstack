
export class DomActions {
    private pokemonListButton: HTMLDivElement | null;
    private pokemonListElement: HTMLDivElement | null;
    private headerElement: HTMLHeadElement | null;
    private mainElement: HTMLElement| null;

   constructor() {
        this.pokemonListButton = document.querySelector(".js-openPokemonList")
        this.pokemonListElement = document.querySelector(".js-pokemonList")
        this.headerElement = document.querySelector("header")
        this.mainElement = document.querySelector("main")


    }

    togglePokemonListClass()  {
        this.pokemonListButton?.addEventListener("click", () => {
            if(this.pokemonListButton && this.pokemonListElement) {
                if(this.pokemonListElement.classList.contains("active")) {
                    this.pokemonListElement.classList.remove("active") 
                    return;
                }
                
                this.pokemonListElement.classList.add("active") 
            }
        })
    }

    updatePokemonListTop() {
        if(this.pokemonListElement && this.headerElement) {
            const headerHeight = this.headerElement.offsetHeight;
            this.pokemonListElement.style.top = `${headerHeight}px`
        }
    }

    updateMainTagTop() {
        if(this.mainElement && this.headerElement) {
            const headerHeight = this.headerElement.offsetHeight;
            this.mainElement.style.marginTop = `${headerHeight}px`
        }
    }

    static init() {
        const domActions = new DomActions();
        domActions.togglePokemonListClass()
        domActions.updatePokemonListTop()
        domActions.updateMainTagTop()
    }
}

