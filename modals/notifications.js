const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true
  },
  detail_desc: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
