const mongoose = require('mongoose');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');


/* Models */
const queryModel = mongoose.model('query');
const notificationModel = mongoose.model('notification');

/**
 * function to get ten notification.
 */
let getTenNotificationFunction = (req, res) => {
	if (check.isEmpty(req.body.userId)) {
		logger.error(
			'userId Field is Missing ',
			'notificationController: getTenNotificationFunction()',
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
		notificationModel
			.find({ 'userWatchlistIds.userId': req.body.userId })
			.select('-__v -_id ')
			.sort({ createdOn: -1 })
			.skip(req.body.skip)
			.limit(10)
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'notificationController: getTenNotificationFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed To Find All Notification',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No Notification Found!',
						'notificationController: getTenNotificationFunction()'
					);
					let apiResponse = response.generate(
						true,
						'No Notification Found!',
						200,
						[]
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'All Notification Found!',
						200,
						result
					);
					res.send(apiResponse);
				}
			});
	}
}; // end get ten notification

/**
 * function to get all notification.
 */
let getAllNotificationFunction = (req, res) => {
	if (check.isEmpty(req.body.userId)) {
		logger.error(
			'userId Field is Missing ',
			'notificationController: getAllNotificationFunction()',
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
		notificationModel
			.find({ 'userWatchlistIds.userId': req.body.userId })
			.select('-__v -_id ')
			.sort({ createdOn: -1 })
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'notificationController: getAllNotificationFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed To Find All Notification',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No Notification Found',
						'notificationController: getAllNotificationFunction()'
					);
					let apiResponse = response.generate(
						true,
						'No Notification Found!',
						200,
						[]
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'All Notification Found!',
						200,
						result
					);
					res.send(apiResponse);
				}
			});
	}
}; // end get all notification

// start editNotificationFunction
let editNotificationFunction = (req, res) => {
	let updateQuery = () => {
		return new Promise((resolve, reject) => {
			if (
				check.isEmpty(req.body.notificationId) ||
				check.isEmpty(req.body.userId)
			) {
				logger.info('No query Found', 'notificationController: updateQuery()');
				let apiResponse = response.generate(
					true,
					'Some parameter is missing!',
					404,
					null
				);
				res.send(apiResponse);
			} else {
				notificationModel.findOneAndUpdate(
					{
						notificationId: req.body.notificationId,
						'userWatchlistIds.userId': req.body.userId,
					},
					{ $set: { 'userWatchlistIds.$.seen': true } },
					{ new: true },
					(err, result) => {
						if (err) {
							logger.error(
								err.message,
								'notificationController: updateQuery()',
								10
							);
							let apiResponse = response.generate(
								true,
								'Failed to update notification',
								500,
								null
							);
							reject(apiResponse);
						} else {
							console.log(result);
							resolve(result);
						}
					}
				);
			}
		});
	};

	updateQuery(req, res)
		.then((resolve) => {
			// delete resolve.password;
			// resolve = {};
			let apiResponse = response.generate(
				false,
				'Notification updated',
				200,
				{}
			);
			res.send(apiResponse);
		})
		.catch((err) => {
			console.log(err);
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end update editNotification Function

module.exports = {
	getTenNotificationFunction: getTenNotificationFunction,
	editNotificationFunction: editNotificationFunction,
	getAllNotificationFunction: getAllNotificationFunction,
}; // end exports
