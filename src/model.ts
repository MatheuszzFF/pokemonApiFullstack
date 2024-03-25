
export async function fetchPokemonData(url:string) {
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

const ws = new WebSocket('ws://localhost:3000'); 
console.log(ws)
ws.onopen = (ws) => {
  console.log("front end connection started")
  console.log(ws);
}

ws.onmessage = (event) => {
  console.log(JSON.parse(event.data));
}