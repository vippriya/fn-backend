const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserFnPreferencesSchema = new Schema({
user_id: {
   type: String,
   required: true
 },
 frequency_of_contact: {
   type: String,
   required: true
 },
 Interest: {
   type: String,
   required: false
 },
 platform_notification_settings: {
   type: String,
   required: false
 },
 email_notitifacion_settings: {
   type: String,
   required: false
 }
}, {
 timestamps: true,
});

const UserFnPreferences = mongoose.model('UserFnPreferences', UserFnPreferencesSchema);

module.exports = UserFnPreferences;
