const format = require('date-fns/format');
const {
	assocPath,
	groupBy,
	identity,
	ifElse,
	keys,
	map,
	not,
	pathOr,
	pick,
	pipe,
	prop,
	reduce
} = require('ramda');

const withDateFrom = ifElse(
	prop('dateFrom'),
	args => assocPath(['createdAt', '$gte'], new Date(args.dateFrom))(args),
	identity
);

const cleanUselessParams = pick(['status', 'createdAt', '$text']);

const getReviewsByCondition = condition => surveys => {
	return reduce((acc, currentSurvey) => {
		if (condition(currentSurvey)) {
			acc += 1;
		}
		return acc;
	}, 0)(surveys);
};

module.exports = {
	getStatistics: async (_, args, {surveys}) => {
		const queriedSurveys = await surveys.find(
			pipe(
				withDateFrom,
				cleanUselessParams
			)(args)
		);

		const perfomanceSurveys = map(survey => ({
			reviewedAt: format(survey.createdAt, 'YYYY-MM-DD'),
			satisfied: survey.review.satisfied
		}))(queriedSurveys);

		return {
			positiveReviews:
				getReviewsByCondition(pathOr(false, ['review', 'satisfied']))(
					queriedSurveys
				) || 0,

			negativeReviews:
				getReviewsByCondition(currentSurvey =>
					not(pathOr(false, ['review', 'satisfied'])(currentSurvey))
				)(queriedSurveys) || 0,

			perfomance: pipe(
				groupBy(survey => survey.reviewedAt),
				map(survey =>
					reduce(
						(acc, currentSurvey) => {
							if (currentSurvey.satisfied) {
								acc.positiveReviews += 1;
							} else {
								acc.negativeReviews += 1;
							}
							return acc;
						},
						{positiveReviews: 0, negativeReviews: 0}
					)(survey)
				),

				props => {
					const dates = keys(props);
					return map(date => ({
						reviewedAt: date,
						...props[date]
					}))(dates);
				}
			)(perfomanceSurveys)
		};
	}
};
