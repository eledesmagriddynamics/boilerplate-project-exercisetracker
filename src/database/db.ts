import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export async function initializeDB() {
  return open({
    filename: './exercise.db',
    driver: sqlite3.Database
  });
}

export async function runMigrations(db: any) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE
    );
    
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      duration INTEGER NOT NULL,
      date DATE NOT NULL DEFAULT (CURRENT_DATE),
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}