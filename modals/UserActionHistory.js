const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserActionHistorySchema = new Schema(
	{
		user_id: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		start: {
			type: String,
			required: false
		},
		end: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		tags: {
			type: String,
			required: false
		},
		page_id: {
			type: String,
			required: false
		},
		page_title: {
			type: String,
			required: false
		},
		action_source: {
			type: String,
			required: false
		},
		action_sub_category_id: {
			type: String,
			required: false
		},
		action_category: {
			type: String,
			required: false
		},
		browser_name: {
			type: String,
			required: false
		},
		browser_settings: {
			type: String,
			required: false
		},
		device: {
			type: String,
			required: false
		},
		browser_width: {
			type: String,
			required: false
		},
		browser_height: {
			type: String,
			required: false
		},
		dpi: {
			type: String,
			required: false
		}
	},
	{
		timestamps: true
	}
);

const UserActionHistory = mongoose.model('UserActionHistory', UserActionHistorySchema);

module.exports = UserActionHistory;
