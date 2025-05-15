const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');
  try {
    const result = await pool.query('SELECT "ID", "Tipo" FROM "Categorias"');
    const categorias = result.rows.map(fila => ({
      ID: fila.ID,
      Tipo: fila.Tipo
    }));
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};