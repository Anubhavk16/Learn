// notificationModel.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'collection',
    required: true
  },
  
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
