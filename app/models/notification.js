'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	notificationId: {
		type: String,
		required: true,
		index: true,
	},
	queryId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
	},
	message: {
		type: String,
	},
	modifiedPersonName: {
		type: String,
		required: true,
	},
	modifiedPersonId: {
		type: String,
		required: true,
	},
	userWatchlistIds: [
		{
			userId: { type: String, required: true },
			seen: { type: Boolean, default: false },
		},
	],
	createdOn: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('notification', notificationSchema);


