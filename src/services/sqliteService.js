import * as SQLite from 'expo-sqlite';

let db;

// Inicializar base de datos
export const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync('dripdesk.db');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS garments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        color TEXT,
        occasion TEXT,
        userId TEXT
      );
    `);

    console.log('SQLite inicializado');
  } catch (error) {
    console.log('SQLite init error:', error);
  }
};

// Insertar prenda
export const insertGarment = async (garment) => {
  try {
    const { name, type, color, occasion, userId } = garment;

    await db.runAsync(
      `INSERT INTO garments (name, type, color, occasion, userId)
       VALUES (?, ?, ?, ?, ?)`,
      [name, type, color, occasion, userId]
    );

    console.log('Prenda guardada en SQLite');
  } catch (error) {
    console.log('SQLite insert error:', error);
  }
};

// Obtener prendas
export const getGarments = async (userId) => {
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM garments WHERE userId = ?`,
      [userId]
    );

    return result;
  } catch (error) {
    console.log('SQLite get error:', error);
    return [];
  }
};