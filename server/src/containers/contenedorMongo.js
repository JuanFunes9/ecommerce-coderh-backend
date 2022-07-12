const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

class ContenedorMongo {

  constructor(uri, model) {
    this.model = model
    this.mongo = mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then(db => console.log(`DB is connected`))
      .catch(err => console.log(err));
  }


  getAll(){
    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    return products;
  }

  getById( id ){
    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    const product = products.find( prod => prod.id === id );

    if ( product == undefined ){
      return({ error: 'Producto no encontrado' });
    } else {
      return( product );
    }
  }

  newProduct( product ){
    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    const date = new Date();
    product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();

    const productsId = products.map( p => p.id );
    product.id = Math.max( ...productsId ) + 1;

    products.push( product );

    fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
    return product;
  }

  editProduct( id, product ){
    const date = new Date();
    product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();
    product.id = id;

    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    const idx = products.findIndex( p => p.id == id );

    if( idx === -1 ){
      return({  error :'El producto que desea editar no existe.' })
    } else {
      products.splice( idx, 1, product );

      fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
      return( product );
    }
  }

  deleteProduct( id ){
    const read = fs.readFileSync( './src/productos.txt', 'utf-8' );
    const products = JSON.parse( read );

    const idx = products.findIndex( p => p.id == id );

    if( idx === -1 ){
      return( { error : 'El producto que desea eliminar no existe.' } )
    } else {
      products.splice( idx, 1 );

      fs.writeFileSync( './src/productos.txt', JSON.stringify( products, null, '\t' ) );
      return( { data: `Se elimino el producto con id: ${ id }` } );
    }
  }

}

module.exports = ContenedorMongo;