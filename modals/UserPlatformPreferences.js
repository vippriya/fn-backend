const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserPlatformPreferencesSchema = new Schema({
 user_id: {
   type: String,
   required: true
 },
 favouirite_apps: {
   type: String,
   required: true
 },
 frequency_of_contact: {
   type: String,
   required: false
 },
 favourite_storages: {
   type: String,
   required: false
 },
 favourite_folders : {
   type: String,
   required: false
 },
 default_page: {
   type: String,
   required: false
 },
 open_apps_by_default: {
   type: String,
   required: false
 },
 favourite_actions : {
   type: String,
   required: false
 },
 favourite_knowledge_folders: {
   type: String,
   required: false
 },
 favourite_tutorials: {
   type: String,
   required: false
 },
 dashboard_settings: {
   type: String,
   required: false
 },
 launch_apps_by_default : {
   type: String,
   required: false
 },
 tags: {
   type: String,
   required: false
 },
}, {
 timestamps: true,
});

const UserPlatformPreferences = mongoose.model('UserPlatformPreferences', UserPlatformPreferencesSchema);

module.exports = UserPlatformPreferences;

