import sqlite3  from "sqlite3";

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./server/tables/pokemon.db');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        sprite TEXT
      )
    `);
});

export function addPokemon(name,sprite) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO pokemons (name, sprite) VALUES (?, ?)', [name, sprite], 
        function(err) {
            if(err) return reject(err)
            resolve(this.lastID);s
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
