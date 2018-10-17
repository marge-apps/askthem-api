const GraphQLJSON = require('graphql-type-json');
const {cancel, create, find, findOne, update} = require('./surveys');

module.exports = {
	JSON: GraphQLJSON,
	Query: {
		createSurvey: create,
		survey: findOne,
		surveys: find,
		cancelSurvey: cancel,
		issueJwt: () => ``
	},
	Mutation: {
		updateSurvey: update
	}
};
