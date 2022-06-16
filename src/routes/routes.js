const router = require( 'express' ).Router();
const fs = require( 'fs' );

//================================================PRODUCTOS==========================================
//1) Devuelve todos los productos (disponible para usuarios y admins)
router.get( '/api/productos/', ( req, res ) => {
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );

  res.json( products );
});

//2) Devuelve un producto segun su id (disponible para usuarios y admins)
router.get( '/api/productos/:id', ( req, res ) => {
  const id = Number( req.params.id );
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );

  const product = products.find( prod => prod.id === id );
  if ( product == undefined ){
      res.send({ error: 'Producto no encontrado' });
  } else {
      res.json( product );
  }
});

//3) Recibe y agrega un producto. Devuelve el producto agregado y su ID asignada (disponible para admins)
router.post( '/api/productos/', ( req, res ) => {
  const product = req.body;
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );

  const date = new Date();
  product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();

  const productsId = products.map( p => p.id );
  product.id = Math.max( ...productsId ) + 1;

  products.push( product );

  fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
  res.json( product );
});

//4) Edita un producto segun su id: (disponible para admins)
router.put( '/api/productos/:id', ( req, res ) => {
  //a)obtenemos el id y el poroducto:
  const id = req.params.id;
  const product = req.body;
  //b) asignamos el id y actualizamos el timeStamp:
  const date = new Date();
  product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();
  product.id = id;
  //c) traemos el array de productos:
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );
  //d) buscamos el index del producto a editar:
  const idx = products.findIndex( p => p.id == id );

  if( idx === -1 ){
      res.send({  error :'El producto que desea editar no existe.' })
  } else {
      products.splice( idx, 1, product );

      fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
      res.json( product );
  }
});

//5) Elimina un producto segun su id: (disponible para admins)
router.delete( '/api/productos/:id', ( req, res ) => {
  const id = req.params.id;
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );

  const idx = products.findIndex( p => p.id == id );

  if( idx === -1 ){
      res.send( 'El producto que desea eliminar no existe.' )
  } else {
      products.splice( idx, 1 );

      fs.writeFileSync( './productos.txt', JSON.stringify( products, null, '\t' ) );
      res.json( `Se elimino el producto con id: ${ id }` );
  }
});

//================================================CARRITO==========================================
//1) crea un carrito y devuelve su id:
router.post( '/api/carrito/', ( req, res ) => {
  //a)creamos el carrito:
  const carrito = { productos: [] };
  //b) leemos el archivo de carritos.txt:
  const read = fs.readFileSync( './src/carritos.txt', 'utf-8' );
  const carritos = JSON.parse( read );
  //c)agregamos el timeStamp:
  const date = new Date();
  carrito.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();
  //d)agregamos el id del carrito:
  const carritosId = carritos.map( p => p.id );
  carrito.id = Math.max( ...carritosId ) + 1;
  //e)pusheamos el carrito en el array de carritoS:
  carritos.push( carrito );
  //f)agregamos el carrito al txt y realizamos la respuesta:
  fs.writeFileSync( './src/carritos.txt', JSON.stringify( carritos, null, '\t' ) );
  res.json( carrito );
});

//2) vacia un carrito y lo elimina por su id:
router.delete( '/api/carrito/:id', ( req, res ) => {
  const id = req.params.id;
  const read = fs.readFileSync( './src/carritos.txt', 'utf-8' );
  const carritos = JSON.parse( read );

  const idx = carritos.findIndex( p => p.id == id );

  if( idx === -1 ){
      res.send( 'El carrito que desea eliminar no existe.' )
  } else {
      carritos.splice( idx, 1 );

      fs.writeFileSync( './src/carritos.txt', JSON.stringify( carritos, null, '\t' ) );
      res.json( `Se elimino el carrito con id: ${ id }` );
  }
});

//3) devuelve el listado de productos presentes en el carrito segun el id del carrito:
router.get( '/api/carrito/:id/productos', ( req, res ) => {
  const id = Number( req.params.id );
  const read = fs.readFileSync( './src/carritos.txt', 'utf-8' );
  const carritos = JSON.parse( read );

  const carrito = carritos.find( prod => prod.id === id );
  if ( carrito == undefined ){
      res.send({ error: 'Carrito no encontrado' });
  } else {
      res.json( carrito.productos );
  }
});

//4) incorpora un producto al carrito (encuentra al carrito por su ID y luego agrega al producto por el ID del producto)
router.post( '/api/carrito/:id/productos', ( req, res ) => {
  const product = req.body;
  const id = Number( req.params.id );
  const read = fs.readFileSync( './src/carritos.txt', 'utf-8' );
  const carritos = JSON.parse( read );

  const carrito = carritos.find( prod => prod.id === id );
  if ( carrito == undefined ){
    res.send({ error: 'Carrito no encontrado' });
  } else {
    carrito.productos.push( product );
    fs.writeFileSync( './src/carritos.txt', JSON.stringify( carritos, null, '\t' ) );
    res.json( carrito );
  }
});

//5) elimina un producto del carrito segun el id del producto:
router.delete( '/api/carrito/:id/productos/:id_prod', ( req, res ) => {
  //a) obtener el ID del carrito y el ID del producto a elmiminar:
  const idCarrito = Number( req.params.id );
  const idProd = Number( req.params.id_prod );
  //b) traer el array de carritos:
  const read = fs.readFileSync( './src/carritos.txt', 'utf-8' );
  const carritos = JSON.parse( read );
  //c) obtener el carrito por su ID en el array de carritos:
  const carrito = carritos.find( prod => prod.id === idCarrito );
  if ( carrito == undefined ){
      res.send({ error: 'Carrito no encontrado' });
  } else {
    //d) obtener el index del producto en el array de productos del carrito
    const idx = carrito.productos.findIndex( p => p.id == idProd );

    if( idx === -1 ){
      res.send({ error: 'Producto no encontrado' })
    } else {
      //e) Eliminar el producto:
      carrito.productos.splice( idx, 1 );

      fs.writeFileSync( './src/carritos.txt', JSON.stringify( carritos, null, '\t' ) );
      res.send( `Se elimino el producto con id: ${ idProd } del carrito ${ idCarrito }` );
    }
  }
});


module.exports = router;