const {ApolloServer, gql} = require('apollo-server-micro');
const schemas = require('../schemas');
const resolvers = require('../resolvers');
const {db, collection} = require('../db');

const typeDefs = gql`
	${schemas}
`;
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({surveys: collection, dbclient: db})
});

module.exports = apolloServer.createHandler({path: '/graphql'});
