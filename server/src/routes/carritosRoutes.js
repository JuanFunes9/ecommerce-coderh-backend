const router = require( 'express' ).Router();
const fs = require( 'fs' );

const FactoryDAO = require( '../DAO/index' );
const DAO = FactoryDAO();

//1) crea un carrito y devuelve su id:
router.post( '/', ( req, res ) => {
  //a)creamos el carrito:
  const carrito = { productos: [] };
  DAO.cart.save( carrito ).then( data => res.json( data ) )
});

//2) vacia un carrito y lo elimina por su id:
router.delete( '/:id', ( req, res ) => {
  DAO.cart.deleteById( req.params.id ).then( data => res.json( data ) );
});

//3) devuelve el listado de productos presentes en el carrito segun el id del carrito:
router.get( '/:id/productos', ( req, res ) => {
  DAO.cart.getById( req.params.id )
    .then( data => res.json( data ) )
});

//4) incorpora un producto al carrito (encuentra al carrito por su ID y luego agrega al producto por el ID del producto)
router.post( '/:id/productos', ( req, res ) => {
  if( process.env.typeDB == 'mongo' ){
    DAO.cart.addToCart( req.params.id, req.body )
    .then( data => res.json( data ) )
  } else {
    DAO.cart.getById( req.params.id )
      .then( carrito => {
        carrito.productos.push( req.body );
        DAO.cart.editById( req.params.id, carrito );
        res.json( carrito )
      } );
  }
});

//5) elimina un producto del carrito segun el id del producto:
router.delete( '/:id/productos/:id_prod', ( req, res ) => {
  if( process.env.typeDB == 'mongo' ){
    DAO.cart.delFromCart( req.params.id, req.params.id_prod )
      .then( data => res.json( data ) )
  } else {
    DAO.cart.getById( req.params.id )
      .then( carrito => {
        const idx = carrito.productos.findIndex( p => p.id == req.params.id_prod )
        if( idx === -1 ){
          res.json({ error: "El producto que desea eliminar no existe." })
        } else {
          carrito.productos.splice( idx, 1 );
          DAO.cart.editById( req.params.id, carrito );
          res.json( carrito );
        }
      } )
  }
  
});

module.exports = router;