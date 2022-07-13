const contenedorMongo = require('../../containers/contenedorMongo')
const CartModel = require( '../../models/CartsModel' )

class CartMongoDAO extends contenedorMongo {

  constructor() {
    super('mongodb://localhost/productos', CartModel)
  }

}

module.exports = CartMongoDAO;