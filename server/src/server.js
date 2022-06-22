//Imports
const express = require( 'express' );
const cors = require( 'cors' );
//import routes sheet:
const productsRoutes = require( './routes/productsRoutes' );
const carritosRoutes = require( './routes/carritosRoutes' );

//inicializar express
const app = express();

//Settings
app.use( cors() );
const PORT = process.env.PORT || 8080;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

//Routes

app.use( '/api/productos', productsRoutes );
app.use( '/api/carrito', carritosRoutes );
app.get( '/*', (req,res) => {
    res.json({
        error: -2,
        desc: "Ruta no implementada"
    })
} )

//Server listening
const server = app.listen( PORT, () => {
    console.log( `Server on PORT: ${ PORT }` );
});
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );

