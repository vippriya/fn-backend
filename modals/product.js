const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  hero: {
    type: String,
    required: false
  },
  categories: {
    type: Array,
    required: false
  },
  tags: {
    type: String,
    required: false
  },
  remarks: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
