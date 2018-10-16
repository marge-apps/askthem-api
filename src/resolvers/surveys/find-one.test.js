const findOne = require('./find-one');

describe('Resolvers: Surveys -> update', () => {
	test('Does not throw', () => {
		const actual = findOne(
			null,
			{id: ''},
			{surveys: {findOne: () => jest.fn()}}
		);

		expect(actual).not.toThrow();
	});
});
