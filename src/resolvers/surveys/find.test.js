const {
	cleanUselessParams,
	find,
	withDateFrom,
	withDateTo,
	withStatus
} = require('./find');

describe('Resolvers: Surveys -> find', () => {
	test('Find not throw', () => {
		const actual = find(null, {id: ''}, {surveys: {find: () => jest.fn()}});

		expect(actual).not.toThrow();
	});

	test('withDateFrom appends dateFrom', () => {
		const actual = withDateFrom({dateFrom: '2018-11-30'});

		expect(actual).toHaveProperty('createdAt.$gte', new Date('2018-11-30'));
	});

	test('withDateFrom returns same object if no date', () => {
		const actual = withDateFrom({invalidDate: '0000-00-00'});

		expect(actual).not.toHaveProperty('createdAt.$gte');
	});

	test('withDateTo appends dateTo', () => {
		const actual = withDateTo({dateTo: '2018-11-30'});

		expect(actual).toHaveProperty('createdAt.$lte', new Date('2018-11-30'));
	});

	test('withDateTo returns same object if no date', () => {
		const actual = withDateTo({invalidDate: '0000-00-00'});

		expect(actual).not.toHaveProperty('createdAt.$lte');
	});

	test('withStatus appends status', () => {
		const actual = withStatus({status: 'pending'});

		expect(actual).toHaveProperty('status', 'pending');
	});
	test('Clean UselessParams', () => {
		const actual = cleanUselessParams({
			dateTo: '',
			dateFrom: '',
			status: 'pending'
		});

		expect(actual).toEqual({status: 'pending'});
	});
});
