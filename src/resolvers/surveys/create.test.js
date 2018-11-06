const create = require('./create');

describe('Resolvers: Surveys -> update', () => {
	test('Does not throw', () => {
		const actual = create(
			null,
			{id: ''},
			{
				surveys: {insert: () => jest.fn()},
				dbclient: {id: jest.fn}
			}
		);

		expect(actual).not.toThrow();
	});
});
