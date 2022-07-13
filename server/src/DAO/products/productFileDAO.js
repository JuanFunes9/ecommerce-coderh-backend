const contenedorFile = require('../../containers/contenedorFile')

class ProductFileDAO extends contenedorFile {

  constructor() {
    super('DB_products.json')
  }

}

module.exports = ProductFileDAO;