const express = require('express');
const router = express.Router();
const queryController = require('./../../app/controllers/queryController');
const appConfig = require('./../../config/appConfig');
const tokenAuth = require('../middlewares/tokenAuth');
const multer = require('multer');
const path = require('path');

// Multer File upload settings
const DIR = './../../public/images';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, DIR));
	},
	filename: (req, file, cb) => {
		const fileName =
			new Date().toISOString().replace(/:/g, '-') +
			'-' +
			file.originalname.toLowerCase().split(' ').join('-');
		cb(null, fileName);
	},
});

// Multer Mime Type Validation
var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 3,
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg' ||
			file.mimetype == 'image/gif'
		) {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	},
});

// defining routes.
module.exports.setRouter = (app) => {
	let baseUrl = `${appConfig.apiVersion}/users`;

	// params: title, status, description, recieverName, recieverId, creatorName, creatorId, image
	app.post(
		`${baseUrl}/create/query`,
		upload.single('image'),
		tokenAuth.isAuthorized,
		queryController.creatQueryFunction
	);

	/**
     * @apiGroup create
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/create/query api for query creation
     *
     * @apiParam {string} title title of the query. (body params) (required)
     * @apiParam {string} status status of the query. (body params) (required)
     * @apiParam {string} description description of the query. (body params) (required)
     * @apiParam {string} recieverName reciever name . (body params) (required)
     * @apiParam {string} recieverId reciever id . (body params) (required)
     * @apiParam {string} creatorName creator name . (body params) (required)
     * @apiParam {string} creatorId creator id . (body params) (required)
     * @apiParam {string} image image of the query. (body params)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Query has created Successfully",
            "status": 200,
            "data": {}

        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed to create query",
	    "status": 500,
	    "data": null
	   }
	 */

	// params: authToken
	app.post(
		`${baseUrl}/get/all/query`,
		tokenAuth.isAuthorized,
		queryController.getAllQueryFunction
	);

	/**
     * @apiGroup read
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/get/all/query api for get all query details
     *
     * @apiParam {string} authToken send authToken. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All Messages Found!",
            "status": 200,
            "data":[{  
               creatorId: "Sw-vulMJ6"
               creatorName: "abhishek"
               description: "s<font face="Arial">sdf</font>"
               image: "http://localhost:3000/images/checksum_cn_3rd_unit.png"
               queryId: "Q1qu_ngO3"
               recieverId: "12345"
               recieverName: "abhi"
               status: "In-Progress"
               title: "testing 1"
               userWatchlistIds: ["Q1qu_ngO3"]
               createdOn: "2020-06-17T06:18:13.000Z"
            }] 
        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed To Find All Message",
	    "status": 500,
	    "data": null
	   }
	 */

   //  get one query data
	app.post(
		`${baseUrl}/get/one/query`,
		tokenAuth.isAuthorized,
		queryController.getOneQueryFunction
	);

	/**
     * @apiGroup read
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/get/one/query api for get one query details
     *
     * @apiParam {string} authToken send authToken. (body params) (required)
	 * @apiParam {string} queryId send query id. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All Messages Found!",
            "status": 200,
            "data": {  
               creatorId: "Sw-vulMJ6"
               creatorName: "abhishek"
               description: "s<font face="Arial">sdf</font>"
               image: "http://localhost:3000/images/checksum_cn_3rd_unit.png"
               queryId: "Q1qu_ngO3"
               recieverId: "12345"
               recieverName: "abhi"
               status: "In-Progress"
               title: "testing 1"
               userWatchlistIds: ["Q1qu_ngO3"]
               createdOn: "2020-06-17T06:18:13.000Z"
            }
		
        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed To Find All Message",
	    "status": 500,
	    "data": null
	   }
	 */

	// params:
	app.post(
		`${baseUrl}/edit/query`,
		upload.single('image'),
		tokenAuth.isAuthorized,
		queryController.editQueryFunction
	);

	/**
     * @apiGroup update
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/edit/query api for edit query.
     *
     * @apiParam {string} title title of the query. (body params) 
     * @apiParam {string} status status of the query. (body params) 
     * @apiParam {string} description description of the query. (body params) 
     * @apiParam {string} recieverName reciever name . (body params) (required)
     * @apiParam {string} recieverId reciever id . (body params) (required)
     * @apiParam {string} image image of the query. (body params)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Query Edited Successful",
            "status": 200,
            "data": {}

        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed to edit query",
	    "status": 500,
	    "data": null
	   }
	 */

	// params: authToken , queryId, userId
	app.post(
		`${baseUrl}/add/to/watchlist/query`,
		tokenAuth.isAuthorized,
		queryController.addToQueryWatchlistFunction
	);

	/**
     * @apiGroup update
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/add/to/watchlist/query api to add user in query watchlist.
     *
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     * @apiParam {string} queryId queryId of the query. (body params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User added Successfully in watchlist",
            "status": 200,
            "data": {}

        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed to add user in query watchlist",
	    "status": 500,
	    "data": null
	   }
	 */

	//  get all watch list querys for one user
	app.post(
		`${baseUrl}/get/all/watchlist/query`,
		tokenAuth.isAuthorized,
		queryController.getAllWatchlistQueryFunction
	);

	/**
     * @apiGroup read
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/get/all/watchlist/query api for get all watchlist query for one user
     *
     * @apiParam {string} authToken send authToken. (body params) (required)
	  * @apiParam {string} userId send user id. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All Watchlist query Found!",
            "status": 200,
            "data": [{  
               creatorId: "Sw-vulMJ6"
               creatorName: "abhishek"
               description: "s<font face="Arial">sdf</font>"
               image: "http://localhost:3000/images/checksum_cn_3rd_unit.png"
               queryId: "Q1qu_ngO3"
               recieverId: "12345"
               recieverName: "abhi"
               status: "In-Progress"
               title: "testing 1"
               userWatchlistIds: ["Q1qu_ngO3"]
               createdOn: "2020-06-17T06:18:13.000Z"
            }]
		
        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed To Find All watchlist query",
	    "status": 500,
	    "data": null
	   }
	 */

	//  delete query from watch list 
	app.post(
		`${baseUrl}/delete/query/from/watchlist`,
		tokenAuth.isAuthorized,
		queryController.deleteQueryFromWatchlistFunction
	);

	/**
     * @apiGroup delete
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/delete/query/from/watchlist api for delete a query from watchlist
     *
     * @apiParam {string} authToken send authToken. (body params) (required)
	  * @apiParam {string} userId send user id. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Watchlist query has deleted!",
            "status": 200,
            "data": {}  
              
        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed To delete watchlist query",
	    "status": 500,
	    "data": null
	   }
	 */

    	//  delete query 
	app.post(
		`${baseUrl}/delete/query`,
		tokenAuth.isAuthorized,
		queryController.deleteQueryFunction
	);

	/**
     * @apiGroup delete
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/delete/query api for delete a query
     *
     * @apiParam {string} authToken send authToken. (body params) (required)
	  * @apiParam {string} queryId send query id. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "query has deleted!",
            "status": 200,
            "data": {}
		
        }
       @apiErrorExample {json} Error-Response:
	 * {
	    "error": true,
	    "message": "Failed To Delete Query",
	    "status": 500,
	    "data": null
	   }
	 */

};
