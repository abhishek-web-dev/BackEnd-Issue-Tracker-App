const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');


/* Models */
const messageModel = mongoose.model('message');
const queryModel = mongoose.model('query');
const notificationModel = mongoose.model('notification');

// start user createMessageFunction function
let createMessageFunction = (req, res) => {
	let queryResult;
	let validateUserInput = () => {
		return new Promise((resolve, reject) => {
			if (
				check.isEmpty(req.body.message) ||
				check.isEmpty(req.body.queryId) ||
				check.isEmpty(req.body.senderName) ||
				check.isEmpty(req.body.senderId)
			) {
				let apiResponse = response.generate(
					true,
					'Field Missing During Message Creation',
					400,
					null
				);
				reject(apiResponse);
			} else {
				queryModel
					.find({ queryId: req.body.queryId })
					.select('-__v -_id  ')
					.lean()
					.exec((err, result) => {
						if (err) {
							logger.error(
								err.message,
								'messageController: createMessageFunction()',
								10
							);
							let apiResponse = response.generate(true, err.message, 500, null);
							res.send(apiResponse);
						} else if (check.isEmpty(result)) {
							logger.info(
								'No Messages Found',
								'messageController: createMessageFunction()',
								5
							);
							let apiResponse = response.generate(
								true,
								'Invalid parameter has passed!',
								404,
								null
							);
							res.send(apiResponse);
						} else {
							queryResult = result[0];
							resolve(req);
						}
					});
			}
		});
	}; // end validate user input

	let createMessage = (req) => {
		return new Promise((resolve, reject) => {
			let newMessage = new messageModel({
				messageId: shortid.generate(),
				message: req.body.message,
				queryId: req.body.queryId,
				senderId: req.body.senderId,
				senderName: req.body.senderName,
				createdOn: time.getLocalTime(),
			});

			newMessage.save((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'messageController: createMessageFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed to create new Message',
						500,
						null
					);
					reject(apiResponse);
				} else {
					resolve(req);
				}
			});
		});
	}; // end create student function

	let createNotification = (req) => {
		return new Promise((resolve, reject) => {
			let watchListIds = queryResult.userWatchlistIds.map((item) => {
				return { userId: item, seen: false };
			});
			let newNotification = new notificationModel({
				notificationId: shortid.generate(),
				queryId: req.body.queryId,
				title: queryResult.title,
				message: 'comented',
				modifiedPersonName: req.body.senderName,
				modifiedPersonId: req.body.senderId,
				userWatchlistIds: watchListIds,
				createdOn: time.getLocalTime(),
			});

			newNotification.save((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'messageController: createMessageFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed to create new Notification',
						500,
						null
					);
					reject(apiResponse);
				} else {
					resolve(result);
				}
			});
		});
	}; // end create student function

	validateUserInput(req, res)
		.then(createMessage)
		.then(createNotification)
		.then((resolve) => {
			//resolve = {};
			let apiResponse = response.generate(
				false,
				'Message has created successfully!',
				200,
				{}
			);
			res.send(apiResponse);
		})
		.catch((err) => {
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end user message creation function

/**
 * function to get ten messages.
 */
let getTenMessages = (req, res) => {
	if (check.isEmpty(req.body.queryId) || check.isEmpty(req.body.skip)) {
		logger.error(
			'UserId Field is Missing ',
			'messageController: getTenMessages()',
			5
		);
		let apiResponse = response.generate(
			true,
			'Some Faild is missing!',
			400,
			null
		);
		res.send(apiResponse);
	} else {
		messageModel
			.find({ queryId: req.body.queryId })
			.select('-__v -_id  -messageId  ')
			.sort({ createdOn: -1 })
			.skip(req.body.skip)
			.limit(10)
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(err.message, 'messageController: getTenMessages()', 10);
					let apiResponse = response.generate(
						true,
						'Failed to find ten message!',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No Messages Found',
						'messageController: getTenMessages()'
					);
					let apiResponse = response.generate(
						true,
						'No Messages Found!',
						404,
						null
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'All Messages Found!',
						200,
						result
					);
					res.send(apiResponse);
				}
			});
	}
}; // end get ten messages

module.exports = {
	createMessageFunction: createMessageFunction,
	getTenMessages: getTenMessages,
};
