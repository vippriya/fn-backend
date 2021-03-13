const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProductCategorySchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },
  tags: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});


const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;
