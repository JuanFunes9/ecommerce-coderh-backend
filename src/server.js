//Imports
const express = require( 'express' );

//inicializar express
const app = express();

//Settings
const PORT = process.env.PORT || 8080;
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

//Routes

app.use( require( './routes/routes' ) );

//Server listening
const server = app.listen( PORT, () => {
    console.log( `Server on PORT: ${ PORT }` );
});
server.on( 'error', err => console.log( 'Error en el server: ' + err ) );

