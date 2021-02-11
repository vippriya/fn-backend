const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
