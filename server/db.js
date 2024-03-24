import sqlite3  from "sqlite3";

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./server/tables/pokemon.db');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pokemonId INTEGER
      )
    `);
});

export function addPokemon(id) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO pokemons (pokemonId) VALUES (?)', [id], 
        function(err) {
            if(err) return reject(err)
            resolve(this.lastID);
        })
    })
}

export function getAllPokemons() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM pokemons', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
}
