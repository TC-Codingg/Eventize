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


app.get('/api/eventos', async (req, res) => {
    try {
        const client = await pool.connect();

        /*let usersdb = []
        let passesdb = []*/

        console.log("Consultando eventos... ");

        const result = 
        await client.query('SELECT e."Nombre", c."Tipo", e."Fecha", e."ID" FROM "Eventos" e JOIN "Categorias" c ON e."ID_Categoria" = c."ID"')

        const datos = result.rows;

        const eventos = datos.map(
            (fila) => ({
                Nombre: fila.Nombre,
                Categoria: fila.Tipo,
                Fecha: fila.Fecha,
                ID: fila.ID
            })
        )

        /*for (let creds = 0; creds < datos.length; creds++) {
            usersdb = datos[creds].Usuario;
            passesdb = datos[creds].Contraseña;
        }*/
        
        client.release()
        
        res.json(eventos)
        console.log(datos)
    }
    catch (err){
    console.error('Error al consultar eventos: ', err)
    res.status(500).json(err)
    }
})

app.get('/api/categorias', async (req, res) => {
    try {
        const client = await pool.connect();

        console.log("Consultando categorias... ");

        const result = 
        await client.query('SELECT "ID", "Tipo" FROM "Categorias"')

        const datos = result.rows;

        const eventos = datos.map(
            (fila) => ({
                ID: fila.ID,
                Tipo: fila.Tipo
            })
        )

        client.release()
        
        res.json(eventos)
        console.log(eventos)
    }
    catch (err){
    console.error('Error al consultar categorias: ', err)
    res.status(500).json(err)
    }
})

app.post('/api/agregarevento', async (req, res) => {
    try {
        const client = await pool.connect();
        const {Nombre, Categoria, Fecha} = req.body;
        
        console.log("Añadiendo evento... ", Nombre, Categoria, Fecha);

        const result = 
        await client.query('INSERT INTO "Eventos" ("Nombre", "ID_Categoria", "Fecha") VALUES ($1, $2, $3);', [Nombre, Categoria, Fecha])

        const datos = result.rows;
        client.release();

        res.json(datos)
    }
    catch (err){
        console.error('Error al añadir evento: ', err)
    }
})


app.post('/api/eliminarevento', async (req, res) => {
    try {
        const client = await pool.connect();
        const {ID} = req.body;
        console.log("Eliminando evento ", ID);
        
        const result2 = 
        await client.query('DELETE FROM "Invitados" WHERE ("ID_Evento") = ($1);', [ID])
        const result = 
        await client.query('DELETE FROM "Eventos" WHERE ("ID") = ($1);', [ID])

        client.release();
        res.json()
    }
    catch (err){
        console.error('Error al eliminar: ', err)
    }
})

app.post('/api/verinv', async (req, res) => {
    try {
        const client = await pool.connect();
        const {ID} = req.body
        console.log("Consultando invitados... ");

        const result = 
        await client.query('SELECT "Nombre", "Apellido", "DNI" FROM "Invitados" WHERE "ID_Evento" = $1;', [ID])

        const datos = result.rows;

        const info = datos.map(
            (fila) => ({
                Nombre: fila.Nombre,
                Apellido: fila.Apellido,
                DNI: fila.DNI
            })
        )

        client.release()
        
        res.json(info)
        console.log(info)
    }
    catch (err){
    console.error('Error al consultar categorias: ', err)
    res.status(500).json(err)
    }
})

app.post('/api/invitar', async (req, res) => {
    try {
        const client = await pool.connect();
        const {Nombre, Apellido, DNI, ID_Evento} = req.body;
        
        console.log("Invitando... ", Nombre, Apellido, DNI, ID_Evento);

        const result = 
        await client.query('INSERT INTO "Invitados" ("Nombre", "Apellido", "DNI", "ID_Evento") VALUES ($1, $2, $3, $4);', [Nombre, Apellido, DNI, ID_Evento])

        const datos = result.rows;
        client.release();

        res.json(datos)
    }
    catch (err){
        console.error('Error al invitar: ', err)
    }
})

app.post('/api/modevento', async (req, res) => {
    try {
        const client = await pool.connect();
        const {datosNew} = req.body;
        
        console.log("Actualizando... ", datosNew.ID, datosNew.Nombre, datosNew.Categoria, datosNew.Fecha);

        const result = 
        await client.query('UPDATE "Eventos" SET "Nombre" = $1, "ID_Categoria" = $2, "Fecha"= $3 WHERE "ID" = $4;', [datosNew.Nombre, datosNew.Categoria, datosNew.Fecha, datosNew.ID])

        const datos = result.rows;
        client.release();

        res.json(datos)
    }
    catch (err){
        console.error('Error al actualizar: ', err)
    }
})

app.post('/api/eliminarinvitado', async (req, res) => {
    try {
        const client = await pool.connect();
        const {DNI} = req.body;
        console.log("Eliminando invitado DNI: ", DNI);

        const result = 
        await client.query('DELETE FROM "Invitados" WHERE ("DNI") = ($1);', [DNI])

        client.release();
        res.json()
    }
    catch (err){
        console.error('Error al eliminar invitado: ', err)
    }
})


app.listen(port, () =>{
    console.log(`Ejecutado en puerto ${port}`);
})