const GraphQLJSON = require('graphql-type-json');
const {cancel, create, findOne, update} = require('./surveys');

module.exports = {
	JSON: GraphQLJSON,
	Query: {
		createSurvey: create,
		survey: findOne,
		surveys: (_, args, {surveys}) => surveys.find({}),
		cancelSurvey: cancel,
		issueJwt: () => ``
	},
	Mutation: {
		updateSurvey: update
	}
};
