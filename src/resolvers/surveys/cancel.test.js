const cancel = require('./cancel');

describe('Resolvers: Surveys -> cancel', () => {
	test.only('Does not throw', () => {
		const actual = cancel(
			null,
			{id: ''},
			{surveys: {findOneAndUpdate: () => jest.fn()}}
		);

		expect(actual).not.toThrow();
	});
});
