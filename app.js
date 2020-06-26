const appConfig = require('./config/appConfig');
const logger = require('./app/libs/loggerLib');
const routeLoggerMiddleware = require('./app/middlewares/routeLogger.js');
const globalErrorMiddleware = require('./app/middlewares/appErrorHandler');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require("helmet");

// Make "public" Folder Publicly Available
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);


const modelsPath = './app/models';
const routesPath = './app/routes';

app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

//Bootstrap models
fs.readdirSync(modelsPath).forEach(function (file) {
	if (~file.indexOf('.js')) require(modelsPath + '/' + file);
});
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach(function (file) {
	if (~file.indexOf('.js')) {
		let route = require(routesPath + '/' + file);
		// console.log('start of routing:',route);
		route.setRouter(app);
	}
});
// end bootstrap route

// calling global 404 handler after route

app.use(globalErrorMiddleware.globalNotFoundHandler);

// end global 404 handler

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
// start listening to http server
console.log(appConfig);
//console.log(app);
server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10);
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			logger.error(
				error.code + ':elavated privileges required',
				'serverOnErrorHandler',
				10
			);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			logger.error(
				error.code + ':port is already in use.',
				'serverOnErrorHandler',
				10
			);
			process.exit(1);
			break;
		default:
			logger.error(
				error.code + ':some unknown error occured',
				'serverOnErrorHandler',
				10
			);
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	let addr = server.address();
	// let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	// console.log('Listening on :' + bind);
	logger.info(
		'server listening on port: ' + addr.port,
		'serverOnListeningHandler',
		10
	);
	let db = mongoose.connect(appConfig.db.uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
	// application specific logging, throwing an error, or other logic here
});

/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
	logger.error(err, 'mongoose connection on error handler', 10);
	//process.exit(1)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
	if (err) {
		logger.error(err, 'mongoose connection open handler', 10);
	} else {
		logger.info(
			'database connection open',
			'database connection open handler',
			10
		);
	}
	//process.exit(1)
}); // end mongoose connection open handler

// end socketio connection handler

module.exports = app;
