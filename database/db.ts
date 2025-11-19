import * as SQLite from 'expo-sqlite';


export const db = SQLite.openDatabaseSync('trivia.db');

export const initializeDatabase = () => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS highscores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT,
      category INTEGER,
      difficulty TEXT,
      score INTEGER,
      date_played TEXT
    );
  `);
};

// insert a new highscore
export const insertHighscore = async (
  playerName: string,
  category: number,
  difficulty: string,
  score: number
) => {
  const date = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO highscores (player_name, category, difficulty, score, date_played)
     VALUES (?, ?, ?, ?, ?)`,
    [playerName, category, difficulty, score, date]
  );
};

// get highscores with optional filters (category, difficulty, mode)
export const getHighscores = async (
  category?: number,
  difficulty?: string,
) => {
  let query = 'SELECT * FROM highscores';
  const params: (string | number)[] = [];

  if (category || difficulty) {
    query += ' WHERE';
    if (category) {
      query += ' category = ?';
      params.push(category);
    }
    if (difficulty) {
      if (category) query += ' AND';
      query += ' difficulty = ?';
      params.push(difficulty);
    }
  }

  query += ' ORDER BY score DESC';

  return await db.getAllAsync(query, params);
};