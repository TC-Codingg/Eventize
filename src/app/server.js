const {Pool} = require('pg')
const express = require('express');
const cors = require('cors')

//const { async } = require('rxjs');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use(express.json());

const pool = new Pool({
    user: 'fl0user',
    host: 'ep-autumn-cake-59558031.us-east-2.aws.neon.tech',
    database: 'base-de-datos',
    password: 'FA0kHVcWP5al',
    port: '5432',
    ssl: {
        rejectUnauthorized: false,
    }});

app.post('/api/registrar', async (req, res) => {
    try {
        const client = await pool.connect();
        const {username, password} = req.body;
        console.log("Registrado: ", username, password)

        const result = 
        await client.query('INSERT INTO "Usuarios" ("Usuario", "Contraseña") VALUES ($1, $2);', [username, password])

        const datos = result.rows;
        client.release();
        res.json(datos)
    }
    catch (err){
        console.error('Error: ', err)
    }
})

app.listen(port, () =>{
    console.log(`Ejecutado en puerto ${port}` )
})