// const fs = require('fs');

class ContenedorMemoria {

	constructor() {
		this.data = []
	}

	async getAll() {
		return this.data
	}

	async getById(id) {
		const objID = this.data.find(obj => obj.id == id);
		if ( objID == undefined ){
      return({ error: 'Producto no encontrado' });
    } else {
      return objID;
    }
	}

	async save(obj) {
		const date = new Date();
    obj.timeStamp = date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();

		obj.id = this.data.length + 1;

		this.data.push(obj);

		return obj;
	}

	async editById(id, obj) {
		obj.id = Number(id);
		const idx = this.data.findIndex( p => p.id == obj.id );
		this.data.splice( idx, 1, obj );
		return obj;
	}

	async deleteById(id) {
		const idx = this.data.findIndex(obj => obj.id == id);
		if ( idx === -1 ){
			return( { error : 'El producto que desea eliminar no existe.' } )
		} else {
			this.data.splice(idx, 1);
			return( { data: `Se elimino el producto con id: ${ id }` } );
		}
	}

	async deleteAll() {
		this.data = []
	}

}

module.exports = ContenedorMemoria;