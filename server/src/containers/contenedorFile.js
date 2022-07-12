const fs = require( 'fs' );

class ContenedorFile {

  constructor( textJson ){
    this.textJson = textJson;
  }

  async getAll(){
    const read = fs.readFileSync( this.textJson, 'utf-8' );
    const products = JSON.parse( read );

    return products;
  }

  async getById( id ){
    const read = fs.readFileSync( this.textJson, 'utf-8' );
    const products = JSON.parse( read );

    const product = products.find( prod => prod.id === Number(id) );

    if ( product == undefined ){
      return({ error: 'Producto no encontrado' });
    } else {
      return( product );
    }
  }

  async newProduct( product ){
    const read = fs.readFileSync( this.textJson, 'utf-8' );
    const products = JSON.parse( read );

    const date = new Date();
    product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();

    const productsId = products.map( p => Number(p.id) );
    product.id = Math.max( ...productsId ) + 1;

    products.push( product );

    fs.writeFileSync( this.textJson, JSON.stringify( products, null, '\t' ) );
    return product;
  }

  async editProduct( id, product ){
    const date = new Date();
    product.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();
    product.id = Number(id);

    const read = fs.readFileSync( this.textJson, 'utf-8' );
    const products = JSON.parse( read );

    const idx = products.findIndex( p => p.id == Number(id) );

    if( idx === -1 ){
      return({  error :'El producto que desea editar no existe.' })
    } else {
      products.splice( idx, 1, product );

      fs.writeFileSync( this.textJson, JSON.stringify( products, null, '\t' ) );
      return( product );
    }
  }

  async deleteProduct( id ){
    const read = fs.readFileSync( this.textJson, 'utf-8' );
    const products = JSON.parse( read );

    const idx = products.findIndex( p => p.id == Number(id) );

    if( idx === -1 ){
      return( { error : 'El producto que desea eliminar no existe.' } )
    } else {
      products.splice( idx, 1 );

      fs.writeFileSync( this.textJson, JSON.stringify( products, null, '\t' ) );
      return( { data: `Se elimino el producto con id: ${ id }` } );
    }
  }

}

module.exports = ContenedorFile;