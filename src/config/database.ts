import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root', // Cambia esto por tu usuario
  password: '', // Cambia esto por tu contraseña
  database: 'mivision_db'
};

export const pool = mysql.createPool(dbConfig);