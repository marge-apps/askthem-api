const health = require('./health')

describe('Health function', () => {
	test('should return ok', () => {
		const actual = health();
		const expected = 'ok';

		expect(actual).toEqual(expected);
	})
})
