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
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  try {
    const { datosNew } = req.body;
    await pool.query('UPDATE "Eventos" SET "Nombre" = $1, "ID_Categoria" = $2, "Fecha"= $3 WHERE "ID" = $4;', [datosNew.Nombre, datosNew.Categoria, datosNew.Fecha, datosNew.ID]);
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};