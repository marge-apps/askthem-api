const GraphQLJSON = require('graphql-type-json');
const {cancel, create, find, findOne, update} = require('./surveys');
const {getStatistics} = require('./analytics');

module.exports = {
	JSON: GraphQLJSON,
	Query: {
		getSurvey: findOne,
		getSurveys: find,
		cancelSurvey: cancel,
		issueJwt: () => ``,
		getStatistics
	},
	Mutation: {
		createSurvey: create,
		updateSurvey: update
	}
};
