const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

class ContenedorMongo {

  constructor(uri, model) {
    this.model = model;
    this.mongo = mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
      .then(db => console.log(`DB is connected`))
      .catch(err => console.log(err));
  }

  async save(obj) {
    const newProduct = new this.model(obj);
    await newProduct.save();

    return newProduct;
  }

  async getById(id) {
    return this.model.find({ _id: new ObjectId(id) })
  }

  async getAll(id) {
    return this.model.find({})
  }

  async editById(id, obj) {
    console.log('UPDATE');
    const objUpdated = await this.model.updateOne(
      { _id: new ObjectId(id) },
      { $set: obj }
    );

    return objUpdated;
  }

  async deleteById(id) {
    const userDelete = await this.model.deleteOne({ _id: new ObjectId(id) });
    return true;
  }

  async addToCart(id, obj){
    const objUpdated = await this.model.updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: {productos : obj} }
    );
    return objUpdated;
  }

  async delFromCart( id, idProd ){
    const objUpdated = await this.model.updateOne(
      { _id: new ObjectId(id) },
      { $pull: {productos : { id: Number(idProd) }} }
    );
    return objUpdated;
  }
}

module.exports = ContenedorMongo;