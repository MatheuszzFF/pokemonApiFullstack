import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { addPokemon, getAllPokemons } from './db.js'

const app = express();
app.use(cors())
app.use(bodyParser.json());


app.post('/store-pokemon', async (req, res) => {
  console.log(`POST request received at ${req.originalUrl}`);
  const { name, sprite } = req.body;

  if (!name || !sprite) {
    return res.status(400).json({ error: 'Name and sprite are required' });
  }

  try {
    const pokemonId = await addPokemon(name, sprite);
    res.status(201).json({ id: pokemonId, name, sprite });
  } catch (error) {
    console.error('Error storing Pokemon:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para obter todos os Pokemons do banco de dados
app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await getAllPokemons();
    res.json(pokemons);
  } catch (error) {
    console.error('Error fetching Pokemons:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});