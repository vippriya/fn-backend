const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({

  title: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: false
  },
  detail_desc: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  imgSrc: {
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

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
