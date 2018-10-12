const {ApolloServer, gql} = require('apollo-server-micro');
const schemas = require('../schemas');
const resolvers = require('../resolvers');
const mocks = require('../mocks');

const typeDefs = gql`
	${schemas}
`;
const apolloServer = new ApolloServer({
	typeDefs,
	mocks,
	mockEntireSchema: false,
	resolvers
});

module.exports = apolloServer.createHandler({path: '/graphql'});
