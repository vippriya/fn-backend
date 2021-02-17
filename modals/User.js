const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		user_id: {
			type: String,
			required: true
		},
		user_name: {
			type: String,
			required: true
		},
		first_name: {
			type: String,
			required: false
		},
		last_name: {
			type: String,
			required: false
		},
		city: {
			type: String,
			required: false
		},
		country: {
			type: String,
			required: false
		},
		email_address: {
			type: String,
			required: false
		},
		profile_desc: {
			type: String,
			required: false
		},
		organization: {
			type: String,
			required: false
		},
		organization_role: {
			type: String,
			required: false
		},
		user_level: {
			type: String,
			required: false
		},
		temp_code: {
			type: String,
			required: false
		},
		purpose_of_visit: {
			type: String,
			required: false
		},
		tags: {
			type: String,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		timezone: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
