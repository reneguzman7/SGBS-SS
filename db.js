require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT, 10),
  ssl: {
    require: true,
    rejectUnauthorized: false // For development only
  },
  connectionTimeoutMillis: 10000, // Aumentar el tiempo de espera a 10 segundos
  idleTimeoutMillis: 30000, // Tiempo máximo de inactividad de una conexión
  max: 20 // Máximo número de clientes en el pool
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Conexión exitosa:', res.rows[0]);
  }
});