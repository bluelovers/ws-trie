import * as utils from '@lazy-trie/util';

describe('Utility methods', () =>
{

	describe('copying objects', () =>
	{
		const input = Object.freeze({
			a: {
				b: {
					c: {},
				},
			},
		});
		let copied = utils.objectCopy(input);

		test('deep copies an object', () =>
		{
			expect(copied).toEqual(input);
			expect(utils.objectCopy()).toEqual({});
		});

		test('mutated copy is different to the original input', () =>
		{
			// @ts-ignore
			copied.x = 1;
			expect(copied).not.toBe(input);
		});
	});

	test('stringifying objects', () =>
	{
		expect(utils.stringify({})).toBe('{}');
		expect(utils.stringify()).toBe('');
		expect(utils.stringify(123)).toBe('123');
	});
});
