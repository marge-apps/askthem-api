const { router, get, post, options } = require('microrouter');
const graphqlHandler = require('./functions/graphql');
const health = require('./functions/health');

module.exports = router(
	get('/', health),
	options('/graphql', graphqlHandler),
	post('/graphql', graphqlHandler),
	get('/graphql', graphqlHandler),
);
