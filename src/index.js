const {router, get, post, options} = require('microrouter');
const cors = require('micro-cors')();
const graphqlHandler = require('./functions/graphql');
const health = require('./functions/health');

const handler = cors(graphqlHandler);
module.exports = router(
	get('/', health),
	options('/graphql', handler),
	post('/graphql', handler),
	get('/graphql', handler)
);
