const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  remote_host: {
    type: String,
    required: true
  },
  connection_id: {
    type: String,
    required: true
  },
  connection_name: {
    type: String,
    required: true
  },
  sharing_profile_id: {
    type: String,
    required: true
  },
  sharing_profile_name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
