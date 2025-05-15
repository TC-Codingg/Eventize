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
    const { ID } = req.body;
    const result = await pool.query('SELECT "Nombre", "Apellido", "DNI" FROM "Invitados" WHERE "ID_Evento" = $1;', [ID]);
    const info = result.rows.map(fila => ({
      Nombre: fila.Nombre,
      Apellido: fila.Apellido,
      DNI: fila.DNI
    }));
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};