const {has} = require('ramda');
const {
	cleanUselessParams,
	withDateFrom,
	withDateTo,
	withOrderDateFrom,
	withOrderDateTo,
	withStatus
} = require('./find');

describe('Resolvers: Surveys -> find -> survey dates', () => {
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
});

describe('Resolvers: Surveys -> find -> survey dates', () => {
	test('withOrderDateFrom appends orderDateFrom', () => {
		const actual = withOrderDateFrom({orderDateFrom: '2018-11-30'});

		expect(has('order.created_at', actual)).toBeTruthy();
	});

	test('withOrderDateTo appends orderDateTo', () => {
		const actual = withOrderDateTo({orderDateTo: '2018-11-30'});

		expect(has('order.updated_at', actual)).toBeTruthy();
	});

	test('withStatus appends status', () => {
		const actual = withStatus({status: 'pending'});

		expect(actual).toHaveProperty('status', 'pending');
	});
});
describe('Resolvers: Surveys -> find -> Ending step', () => {
	test('Clean UselessParams', () => {
		const actual = cleanUselessParams({
			dateTo: '',
			dateFrom: '',
			status: 'pending'
		});

		expect(actual).toEqual({status: 'pending'});
	});
});
