const {Pool} = require('pg')
const express = require('express');
const cors = require('cors')

//const { async } = require('rxjs');
const app = express()
const port = 3000;

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use(express.json());


let sesionVerificada = false

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
        
        //console.log("Registrado: ", username, password);

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
        console.error('Error al registrar: ', err)
    }
})

app.post('/api/eliminaruser', async (req, res) => {
    try {
        const client = await pool.connect();
        const {username, password} = req.body;
        console.log("Eliminando: ", username, password);

        const result = 
        await client.query('DELETE FROM "Usuarios" WHERE ("Usuario", "Contraseña") = ($1, $2);', [username, password])

        datos = result.rows
        client.release();
        res.json(datos)
    }
    catch (err){
        console.error('Error al eliminar: ', err)
    }
})


app.post('/api/verificar', async (req, res) => {
    try {
        let verificado = false;
        const client = await pool.connect();
        const {username, password} = req.body;

        //console.log("Verificando... ", username, password);

        const result = 
        await client.query('SELECT "Usuario", "Contraseña" FROM "Usuarios"')

        const datos = result.rows;

        for (let creds = 0; creds < datos.length; creds++) {
            const usersdb = datos[creds].Usuario;
            const passesdb = datos[creds].Contraseña;

            if (username == usersdb && password == passesdb) {
                console.log("Verificadooo");
                verificado = true
                session = [username, password]
                break;
        }
        }
        
        
        client.release();

        if (verificado){
            res.json({verificado: true})
        }
        else{
            res.status(503).json()
        }

    }
    catch (err){
        console.error('Error al verificar: ', err)
        res.status(500).json(err)
    }
})



//Pendientes
/* app.post('/api/guardarsesion', async (req, res) => {
    try {
        const {verificado} = req.body;
        console.log("Guardando sesión: ", verificado);
        
        sesionVerificada = verificado

        res.json()
    }
    catch (err){
        console.error('Error al guardar sesión: ', err)
    }
})

app.get('/api/traersesion', async (req, res) => {
    try {
        res.json(sesionVerificada)
    }
    catch (err){
        console.error('Error al retornar sesión: ', err)
    }
})*/ 

app.listen(port, () =>{
    console.log(`Ejecutado en puerto ${port}` );
})