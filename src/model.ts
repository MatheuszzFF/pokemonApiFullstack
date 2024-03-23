

export async function fetchPokemonData(url:string) {
    let req = await fetch(url)
    let res = await req.json();
    return res
}

export async function storePokemon(name: string, sprite: string) {
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

export async function getAllStoredPokemons() {
    const url = 'http://localhost:3000/pokemons'
    const req = await fetch(url)
    const res = await req.json();
    console.log(res)
} 