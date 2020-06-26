const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const fs = require('fs');

/* Models */
const queryModel = mongoose.model('query');
const notificationModel = mongoose.model('notification');
const messageModel = mongoose.model('message');

// start create query function
let creatQueryFunction = (req, res) => {
	let validateUserInput = () => {
		return new Promise((resolve, reject) => {
			if (
				check.isEmpty(req.body.status) ||
				check.isEmpty(req.body.title) ||
				check.isEmpty(req.body.description) ||
				check.isEmpty(req.body.recieverName) ||
				check.isEmpty(req.body.recieverId) ||
				check.isEmpty(req.body.creatorName) ||
				check.isEmpty(req.body.creatorId)
			) {
				let apiResponse = response.generate(
					true,
					'Field Missing During Query Creation',
					400,
					null
				);
				reject(apiResponse);
			} else {
				resolve(req);
			}
		});
	}; // end validate user input

	let createQuery = () => {
		return new Promise((resolve, reject) => {
			const url = req.protocol + '://' + req.get('host');

			let uniqueId = shortid.generate();
			let newQuery = new queryModel({
				queryId: uniqueId,
				status: req.body.status,
				title: req.body.title,
				description: req.body.description,
				recieverName: req.body.recieverName,
				recieverId: req.body.recieverId,
				creatorName: req.body.creatorName,
				creatorId: req.body.creatorId,
				userWatchlistIds: [req.body.creatorId, req.body.recieverId],
				image: url + '/images/' + req.file.filename,
				createdOn: time.getLocalTime(),
			});

			newQuery.save((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'queryController: creatQueryFunction()-->createQuery()',
						5
					);
					let apiResponse = response.generate(
						true,
						'Failed to create new Query',
						500,
						null
					);
					reject(apiResponse);
				} else {
					resolve(result);
				}
			});
		});
	}; // end create user function

	validateUserInput(req, res)
		.then(createQuery)
		.then((resolve) => {
			let apiResponse = response.generate(false, 'Query created!', 200, {});
			res.send(apiResponse);
		})
		.catch((err) => {
			logger.error(err.message, 'queryController: creatQueryFunction()', 5);
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end create query function

// start editQueryFunction
let editQueryFunction = (req, res) => {
	let queryResult;

	let validateInput = () => {
		return new Promise((resolve, reject) => {
			if (req.body.queryId) {
				queryModel
					.findOne({ queryId: req.body.queryId })
					.select('-__v -_id  -createdOn -queryId')
					.lean()
					.exec((err, result) => {
						if (err) {
							logger.error(err.message, 'queryController: updateQuery()', 10);
							let apiResponse = response.generate(
								true,
								'Failed To Find query!',
								500,
								null
							);
							res.send(apiResponse);
						} else if (check.isEmpty(result)) {
							logger.info('No query Found', 'queryController: updateQuery()');
							let apiResponse = response.generate(
								true,
								'No query Found',
								404,
								null
							);
							res.send(apiResponse);
						} else {
							queryResult = result;
							resolve(req);
						}
					});
			} else {
				logger.error(
					'queryId Field is Missing ',
					'queryController: updateQuery()',
					5
				);
				let apiResponse = response.generate(
					true,
					'some Faild is missing',
					400,
					null
				);
				res.send(apiResponse);
			}
		});
	};

	let updateQuery = (req) => {
		return new Promise((resolve, reject) => {
			const url = req.protocol + '://' + req.get('host');
			let newQuery;
			if (req.file !== undefined) {
				newQuery = req.body;
				newQuery.image = url + '/images/' + req.file.filename;
			} else {
				newQuery = req.body;
			}
	
			let newWatchList = queryResult.userWatchlistIds;
			
			if (req.body.recieverId !== queryResult.recieverId) {
				const index = newWatchList.indexOf(queryResult.recieverId);
				if (index > -1) {
					newWatchList.splice(index, 1);
				}
				newWatchList.push(req.body.recieverId);
				newQuery.userWatchlistIds = newWatchList;
			}

			// notification data
			let watchListIds = newWatchList.map((item) => {
				return { userId: item, seen: false };
			});
			let uniqueId = shortid.generate();
			let newNotification = new notificationModel({
				notificationId: uniqueId,
				queryId: req.body.queryId,
				title: req.body.title,
				message: 'updated',
				modifiedPersonName: req.body.userName,
				modifiedPersonId: req.body.userId,
				userWatchlistIds: watchListIds,
				createdOn: time.getLocalTime(),
			});

			delete newQuery.userId;
			delete newQuery.userName;

			queryModel.findOneAndUpdate(
				{ queryId: req.body.queryId },
				{ $set: newQuery },
				(err, result) => {
					if (err) {
						logger.error(err.message, 'queryController: updateQuery()', 10);
						let apiResponse = response.generate(
							true,
							'Failed to update query',
							500,
							null
						);
						reject(apiResponse);
					} else {
						if (req.file !== undefined) {
							//console.log(__dirname+"./../../public" +result.image.substring(21));
							fs.unlink(
								__dirname + './../../public' + result.image.substring(21),
								(err) => {
									if (err) {
										throw err;
									}
								}
							);
						}

						newNotification.save((err, result) => {
							if (err) {
								logger.error(err.message, 'queryController: updateQuery()', 5);
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
					}
				}
			);
		});
	};

	validateInput(req, res)
		.then(updateQuery)
		.then((resolve) => {
			let apiResponse = response.generate(
				false,
				'query updated successfully!',
				200,
				resolve
			);
			res.send(apiResponse);
		})
		.catch((err) => {
			logger.error(err.message, 'queryController: updateQuery()', 5);
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end editQuery Function

/**
 * function to get all querys.
 */
let getAllQueryFunction = (req, res) => {
	queryModel
		.find()
		.select('-__v -_id ')
		.lean()
		.exec((err, result) => {
			if (err) {
				logger.error(err.message, 'queryController: getAllQueryFunction()', 10);
				let apiResponse = response.generate(
					true,
					'Failed To Find All Query',
					500,
					null
				);
				res.send(apiResponse);
			} else if (check.isEmpty(result)) {
				logger.info('No Query Found', 'queryController: getAllQueryFunction()');
				let apiResponse = response.generate(true, 'No Query Found!', 404, null);
				res.send(apiResponse);
			} else {
				let apiResponse = response.generate(
					false,
					'All Query Found!',
					200,
					result
				);
				res.send(apiResponse);
			}
		});
}; // end get all query

/**
 * function to get one querys.
 */
let getOneQueryFunction = (req, res) => {
	if (check.isEmpty(req.body.queryId)) {
		logger.error(
			'QueryId Field is Missing ',
			'queryController: getOneQueryFunction()',
			5
		);
		let apiResponse = response.generate(
			true,
			'some parameter is missing!',
			400,
			null
		);
		res.send(apiResponse);
	} else {
		queryModel
			.find({ queryId: req.body.queryId })
			.select('-__v -_id ')
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'queryController: getOneQueryFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed To Find query',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No Query Found',
						'queryController: getOneQueryFunction()'
					);
					let apiResponse = response.generate(
						true,
						'No Query Found!',
						404,
						null
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'Query Found!',
						200,
						result
					);
					res.send(apiResponse);
				}
			});
	}
}; // end get one query

// start addToQueryWatchlistFunction
let addToQueryWatchlistFunction = (req, res) => {
	let updateQuery = () => {
		return new Promise((resolve, reject) => {
			if (req.body.queryId) {
				queryModel
					.findOne({ queryId: req.body.queryId })
					.select('-__v -_id  -createdOn -queryId')
					.lean()
					.exec((err, result) => {
						if (err) {
							logger.error(err.message, 'queryController: updateQuery()', 10);
							let apiResponse = response.generate(
								true,
								'Failed To Find query!',
								500,
								null
							);
							res.send(apiResponse);
						} else if (check.isEmpty(result)) {
							logger.info('No query Found', 'queryController: updateQuery()');
							let apiResponse = response.generate(
								true,
								'No query Found',
								404,
								null
							);
							res.send(apiResponse);
						} else {
							queryModel.findOneAndUpdate(
								{ queryId: req.body.queryId },
								{ $push: { userWatchlistIds: req.body.userId } },
								{ new: true },
								(err, result) => {
									if (err) {
										logger.error(
											err.message,
											'queryController: updateQuery()',
											10
										);
										let apiResponse = response.generate(
											true,
											'Failed to update query',
											500,
											null
										);
										reject(apiResponse);
									} else {
										resolve(result);
									}
								}
							);
						}
					});
			} else {
				logger.error(
					'queryId Field is Missing ',
					'queryController: updateQuery()',
					5
				);
				let apiResponse = response.generate(
					true,
					'some parameter is missing',
					400,
					null
				);
				res.send(apiResponse);
			}
		});
	};

	updateQuery(req, res)
		.then((resolve) => {
			let apiResponse = response.generate(false, 'query updated', 200, {});
			res.send(apiResponse);
		})
		.catch((err) => {
			logger.error(err.message, 'queryController: catch()', 10);
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end update addToQueryWatchlist Function

/**
 * function to get all watchlist querys.
 */
let getAllWatchlistQueryFunction = (req, res) => {
	if (check.isEmpty(req.body.userId)) {
		logger.error(
			'QueryId Field is Missing ',
			'queryController: getAllWatchlistQueryFunction()',
			5
		);
		let apiResponse = response.generate(
			true,
			'some parameter is missing!',
			400,
			null
		);
		res.send(apiResponse);
	} else {
		queryModel
			.find({ userWatchlistIds: { $in: req.body.userId } })
			.select('-__v -_id ')
			.lean()
			.exec((err, result) => {
				if (err) {
					logger.error(
						err.message,
						'queryController: getAllWatchlistQueryFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed To Find All Watchlist Query',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No Watchlist Query Found',
						'queryController: getAllWatchlistQueryFunction()'
					);
					let apiResponse = response.generate(
						true,
						'No Watchlist Query Found!',
						404,
						null
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'All watchlist query Found!',
						200,
						result
					);
					res.send(apiResponse);
				}
			});
	}
}; // end get all watchlist query

/**
 * function to delete watchlist querys.
 */
let deleteQueryFromWatchlistFunction = (req, res) => {
	if (check.isEmpty(req.body.userId) || check.isEmpty(req.body.queryId)) {
		logger.error(
			'Field is Missing ',
			'queryController: deleteQueryFromWatchlistFunction()',
			5
		);
		let apiResponse = response.generate(true, 'Faild is missing!', 400, null);
		res.send(apiResponse);
	} else {
		queryModel.updateOne(
			{ queryId: req.body.queryId },
			{ $pull: { userWatchlistIds: req.body.userId } },
			(err, result) => {
				if (err) {
					logger.error(
						err.message,
						'queryController: deleteQueryFromWatchlistFunction()',
						10
					);
					let apiResponse = response.generate(
						true,
						'Failed To Find watchlist Query',
						500,
						null
					);
					res.send(apiResponse);
				} else if (check.isEmpty(result)) {
					logger.info(
						'No watchlist query Found',
						'queryController: deleteQueryFromWatchlistFunction()'
					);
					let apiResponse = response.generate(
						true,
						'No Watchlist query Found!',
						404,
						null
					);
					res.send(apiResponse);
				} else {
					let apiResponse = response.generate(
						false,
						'query watchlist has updated!',
						200,
						result
					);
					res.send(apiResponse);
				}
			}
		);
	}
}; // end delete watchlist query

/**
 * function to delete query.
 */
let deleteQueryFunction = (req, res) => {
	let queryResult;

	let validateUserInput = (req) => {
		return new Promise((resolve, reject) => {
			if (check.isEmpty(req.body.queryId) || check.isEmpty(req.body.userId)) {
				let apiResponse = response.generate(
					true,
					'Field Missing During Message deletion',
					400,
					null
				);
				reject(apiResponse);
			} else {
				queryModel
					.find({ queryId: req.body.queryId })
					.select('-__v -_id   ')
					.lean()
					.exec((err, result) => {
						if (err) {
							logger.error(
								err.message,
								'queryController: validateUserInput()',
								10
							);
							let apiResponse = response.generate(
								true,
								'Invalid parameter!',
								500,
								null
							);
							res.send(apiResponse);
						} else if (check.isEmpty(result)) {
							logger.info(
								'No Messages Found',
								'queryController: validateUserInput()'
							);
							let apiResponse = response.generate(
								true,
								'Invalid Parameter!',
								404,
								null
							);
							res.send(apiResponse);
						} else {
							queryResult = result[0];
							if (req.body.userId == queryResult.creatorId) {
								resolve(req);
							} else {
								let apiResponse = response.generate(
									false,
									"You don't have right to delete this query!",
									200,
									result
								);
								reject(apiResponse);
							}
						}
					});
			}
		});
	}; // end validate user input

	let deleteQuery = (req) => {
		return new Promise((resolve, reject) => {
			queryModel.findOneAndDelete(
				{ queryId: req.body.queryId },
				(err, result) => {
					if (err) {
						logger.error(err.message, 'queryController: deleteQuery()', 10);
						let apiResponse = response.generate(
							true,
							'Failed To Delete Query',
							500,
							null
						);
						res.send(apiResponse);
					} else {
						resolve(req);
					}
				}
			);
		});
	};

	let deleteAllMessage = (req) => {
		return new Promise((resolve, reject) => {
			messageModel.deleteMany({ queryId: req.body.queryId }, (err, result) => {
				if (err) {
					logger.error(err.message, 'queryController: deleteAllMessage()', 10);
					let apiResponse = response.generate(
						true,
						'Failed To Delete Messages',
						500,
						null
					);
					reject(apiResponse);
				} else {
					resolve(req);
				}
			});
		});
	};

	let createNotification = (req) => {
		return new Promise((resolve, reject) => {
			let watchListIds = queryResult.userWatchlistIds.map((item) => {
				return { userId: item, seen: false };
			});
			let newNotification = new notificationModel({
				notificationId: shortid.generate(),
				queryId: req.body.queryId,
				title: queryResult.title,
				message: 'deleted',
				modifiedPersonName: queryResult.creatorName,
				modifiedPersonId: queryResult.creatorId,
				userWatchlistIds: watchListIds,
				createdOn: time.getLocalTime(),
			});

			newNotification.save((err, result) => {
				if (err) {
					logger.error(err.message, 'queryController: createNotification', 10);
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
		.then(deleteQuery)
		.then(deleteAllMessage)
		.then(createNotification)
		.then((resolve) => {
			let apiResponse = response.generate(
				false,
				'Query has deleted successfully!',
				200,
				{}
			);
			res.send(apiResponse);
		})
		.catch((err) => {
			let apiResponse = response.generate(true, err.message, err.status, {});
			res.send(apiResponse);
		});
}; // end delete  query

module.exports = {
	creatQueryFunction: creatQueryFunction,
	getAllQueryFunction: getAllQueryFunction,
	getOneQueryFunction: getOneQueryFunction,
	editQueryFunction: editQueryFunction,
	addToQueryWatchlistFunction: addToQueryWatchlistFunction,
	getAllWatchlistQueryFunction: getAllWatchlistQueryFunction,
	deleteQueryFromWatchlistFunction: deleteQueryFromWatchlistFunction,
	deleteQueryFunction: deleteQueryFunction,
}; // end exports
