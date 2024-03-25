import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import WebSocket, { WebSocketServer } from "ws";
import { addPokemon, getAllPokemons } from './db.js'

dotenv.config();
const app = express();
app.use(cors())
app.use(bodyParser.json());

let previousPokemons;

app.post('/store-pokemon', async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'pokemon id required' });

  const allSavedPokemons = await getAllPokemons()
  const haveThePokemon = allSavedPokemons.filter(({pokemonId}) => pokemonId === id)
  
  if(haveThePokemon.length > 0) {
    res.status(201).json({ 
      message: "You already have this pokemon saved",
      alreadyHavePokemon: true
    });
    return
  }

  try {
    await addPokemon(id);
    res.status(201).json({ 
      message: "Pokemon list updated!",
      alreadyHavePokemon: false
    });
    sendNewPokemon()
    
  } catch (error) {
    console.error('Error storing Pokemon:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    previousPokemons = pokemons;
    res.status(201).json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokemons:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function sendNewPokemon() {
  wss.clients.forEach(async client => {
    if(client.readyState === WebSocket.OPEN) {
      const pokemons = await getAllPokemons();
      const pokemonToSend = pokemons.filter(pokemon => {
        return !previousPokemons.some(oldPokemon => oldPokemon.pokemonId === pokemon.pokemonId);
      })
      const pokemonJson = JSON.stringify(pokemonToSend)
      client.send(pokemonJson)
      previousPokemons = pokemons
    }
  })
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log("success connecting websocket")

  ws.on('close', () => {
    console.log('Client disconnected');
  });
})


