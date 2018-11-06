const update = require('./update');

describe('Resolvers: Surveys -> update', () => {
	test.only('Does not throw', () => {
		const actual = update(
			null,
			{id: '', status: 'pending'},
			{surveys: {findOneAndUpdate: () => jest.fn()}}
		);

		expect(actual).not.toThrow();
	});
});
