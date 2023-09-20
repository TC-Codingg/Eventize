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

        function session() {
            return username, password
        }
        res.json(datos)
    }
    catch (err){
        console.error('Error: ', err)
    }
})

app.delete('/api/eliminaruser', async (req, res) => {
    try {
        const client = await pool.connect();
        const {username, password} = req.body
        console.log("Eliminando: ", username, password)

        const result = 
        await client.query('DELETE FROM "Usuarios" WHERE "Usuarios" = $1, "Contraseña" = $2;', [username, password])

        client.release();
        res.json()
    }
    catch (err){
        console.error('Error: ', err)
    }
})


app.post('/api/verificar', async (req, res) => {
    try {
        const client = await pool.connect();
        const {username, password} = req.body;

        console.log("Verificando... ", username, password)

        const result = 
        await client.query('SELECT "Usuario", "Contraseña" FROM "Usuarios"')

        const datos = result.rows;
        let verificado = false

        for (let creds = 0; creds < datos.length; creds++) {
            const usersdb = datos[creds].Usuario;
            const passesdb = datos[creds].Contraseña;
            console.log = datos[creds].Usuario

            if (username === usersdb && password === passesdb) {
                console.log("Verificadooo")
                verificado = true
                break;
        }
        }
        
        
        client.release();

        if (verificado){
            res.json({verificado: true})
        }
        else{
            res.json({verificado: false})
        }

    }
    catch (err){
        console.error('Error: ', err)
        res.status(500).json(err)
    }
})

app.listen(port, () =>{
    console.log(`Ejecutado en puerto ${port}` )
})