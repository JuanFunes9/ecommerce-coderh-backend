const mongoose = require('mongoose');

const CartModel = mongoose.model(
  'Carts',
  new mongoose.Schema({
    productos: Array,
    timeStamp: Date
  })
);

module.exports = CartModel;