const { ApolloServer, gql } = require('apollo-server-micro');
const schemas = require('../schemas')
const resolvers = require('../resolvers')

const typeDefs = gql`${schemas}`
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	mocks: true
})

module.exports = apolloServer.createHandler({path: '/graphql'});
