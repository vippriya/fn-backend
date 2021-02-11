const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationReferenceSchema = new Schema({
  link_id: {
    type: String,
    required: true
  },
  application_id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  title: {
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

const ApplicationReference = mongoose.model('ApplicationReference', ApplicationReferenceSchema);

module.exports = ApplicationReference;
