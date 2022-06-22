const router = require( 'express' ).Router();
const fs = require( 'fs' );

//1) Devuelve todos los productos (disponible para usuarios y admins)
router.get( '/', ( req, res ) => {
  const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
  const products = JSON.parse( read );

  res.json( products );
});

//2) Devuelve un producto segun su id (disponible para usuarios y admins)
router.get( '/:id', ( req, res ) => {
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
router.post( '/', ( req, res ) => {
  if( req.headers.admin ){
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
  }
  else{
    res.json({
      error: -1,
      desc: 'Ruta y metodo POST no autorizado.',
    })
  }
});

//4) Edita un producto segun su id: (disponible para admins)
router.put( '/:id', ( req, res ) => {
  if( req.headers.admin ){
    //a)obtenemos el id y el poroducto:
    const id = Number( req.params.id );
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
  }
  else{
    res.json({
      error: -1,
      desc: 'Ruta y metodo PUT no autorizado.',
    })
  }
});

//5) Elimina un producto segun su id: (disponible para admins)
router.delete( '/:id', ( req, res ) => {
  if( req.headers.admin ){
    const id = req.params.id;
    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    const idx = products.findIndex( p => p.id == id );

    if( idx === -1 ){
        res.send( 'El producto que desea eliminar no existe.' )
    } else {
        products.splice( idx, 1 );

        fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
        res.json( `Se elimino el producto con id: ${ id }` );
    }
  }
  else{
    res.json({
      error: -1,
      desc: 'Ruta y metodo DELETE no autorizado.',
    })
  }
});

module.exports = router;