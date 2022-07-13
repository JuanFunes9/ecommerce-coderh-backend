const contenedorFile = require('../../containers/contenedorFile')

class CartFileDAO extends contenedorFile {

  constructor() {
    super('DB_carts.json')
  }

}

module.exports = CartFileDAO;