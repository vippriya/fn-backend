const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationReferenceSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  links: {
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

const ApplicationReference = mongoose.model('ApplicationReference', ApplicationReferenceSchema);

module.exports = ApplicationReference;
