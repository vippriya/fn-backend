const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
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
  }
}, {
  timestamps: true,
});

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;
