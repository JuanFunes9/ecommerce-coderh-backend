const mongoose = require('mongoose');

const ProductModel = mongoose.model(
  'Products',
  new mongoose.Schema({
    title: String,
    price: Number,
    desc: String,
    cod: String,
    thumbnail: String,
    stock: Number,
    timeStamp: Date
  })
);

module.exports = ProductModel;