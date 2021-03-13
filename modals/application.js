const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
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
    required: true
  },
  version: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  links: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
