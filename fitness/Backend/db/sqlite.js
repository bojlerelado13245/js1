// db/sqlite.js
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const DB_FILE = process.env.DB_FILE || path.join(__dirname, "database.sqlite");

// ensure folder exists
const dir = path.dirname(DB_FILE);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) throw err;

      // --- táblák létrehozása ha nem léteznek ---
      db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password_hash TEXT
    )`);

            db.run(`CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      duration INTEGER,
      notes TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

            db.run(`CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER,
      name TEXT,
      reps INTEGER,
      sets INTEGER,
      weight REAL,
      FOREIGN KEY(workout_id) REFERENCES workouts(id)
    )`);
      });
});

// Promise helper-ek
function runAsync(sql, params = []) {
      return new Promise((res, rej) => {
            db.run(sql, params, function (err) {
                  if (err) rej(err);
                  else res({ lastID: this.lastID, changes: this.changes });
            });
      });
}
function allAsync(sql, params = []) {
      return new Promise((res, rej) => {
            db.all(sql, params, (err, rows) => (err ? rej(err) : res(rows)));
      });
}
function getAsync(sql, params = []) {
      return new Promise((res, rej) => {
            db.get(sql, params, (err, row) => (err ? rej(err) : res(row)));
      });
}

module.exports = { db, runAsync, allAsync, getAsync };
