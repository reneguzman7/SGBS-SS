require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false // For development only
  }
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Conexión exitosa:', res.rows[0]);
  }
});