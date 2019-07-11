function logger(req) {
	console.log(`${req.connection.remoteAddress} ${req.url} ${req.method} ${new Date}` );
}

module.exports = logger;