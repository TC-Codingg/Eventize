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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const idUsuario = req.query.idUsuario;
    if (!idUsuario) {
      return res.status(400).json({ error: 'Falta ID de Usuario' });
    }

    const result = await pool.query(
      `SELECT e."Nombre", c."Tipo", e."Fecha", e."ID"
       FROM "Eventos" e
       JOIN "Categorias" c ON e."ID_Categoria" = c."ID"
       WHERE e."ID_Usuario" = $1`,
      [idUsuario]
    );

    const eventos = result.rows.map(fila => ({
      Nombre: fila.Nombre,
      Categoria: fila.Tipo,
      Fecha: fila.Fecha,
      ID: fila.ID
    }));

    return res.status(200).json(eventos);
  } catch (err) {
    console.error('Error in /api/eventos/[idUsuario]:', err);
    return res.status(500).json({ error: err.message });
  }
};
