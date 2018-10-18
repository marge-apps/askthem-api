const {router, get, post, options} = require('microrouter');
const cors = require('micro-cors')();
const graphqlHandler = require('./functions/graphql');
const health = require('./functions/health');

module.exports = cors(
	router(
		get('/', health),
		post('/graphql', graphqlHandler),
		get('/graphql', graphqlHandler)
	)
);
