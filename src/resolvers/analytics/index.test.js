const mock = require('../../../fixtures/surveys');
const {getStatistics} = require('.');

const perfomance = [
	{
		positiveReviews: 5,
		negativeReviews: 0,
		reviewedAt: '2018-10-22'
	},
	{
		positiveReviews: 0,
		negativeReviews: 2,
		reviewedAt: '2018-10-24'
	}
];
describe('Resolvers: getStatistics', () => {
	test('withDateFrom appends dateFrom', async () => {
		const actual = await getStatistics(
			null,
			{dateFrom: '2010-11-30'},
			{surveys: {find: () => mock}}
		);

		expect(actual).toHaveProperty('positiveReviews', 5);
		expect(actual).toHaveProperty('negativeReviews', 2);
		expect(actual).toHaveProperty('perfomance', perfomance);
	});
});
