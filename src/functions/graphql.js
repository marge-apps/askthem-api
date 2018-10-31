const {ApolloServer, gql} = require('apollo-server-micro');
const monk = require('monk');
const schemas = require('../schemas');
const resolvers = require('../resolvers');

const db = monk(process.env.MONGODB_URI);
const collection = db.get('surveys');
collection.createIndex({
	'customer.email': 'text',
	'customer.firstName': 'text',
	'customer.lastName': 'text',
	'review.comment': 'text',
	shop: 'text'
});

const typeDefs = gql`
	${schemas}
`;
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({surveys: collection, dbclient: db})
});

module.exports = apolloServer.createHandler({path: '/graphql'});
