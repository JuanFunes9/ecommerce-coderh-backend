const contenedorMongo = require('../../containers/contenedorMongo')
const ProductModel = require( '../../models/ProductsModel' )

class ProductMongoDAO extends contenedorMongo {

  constructor() {
    super('mongodb://localhost/productos', ProductModel)
  }

}

module.exports = ProductMongoDAO;