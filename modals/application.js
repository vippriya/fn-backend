const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  version: {
    type: String,
    required: false
  },
  product_id: {
    type: String,
    required: false
  },
  links: {
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


const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
