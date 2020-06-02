import trie from 'trie-prefix-tree';
import trieToRegExp from '../index';

const arr = ['trea', 'tr2a', 'trie', '1', 'foobar', 'foobaz', 'foozap', 'fooza', '$'];

test(`array`, () =>
{
	let t1 = trie(arr).tree();

	let re = trieToRegExp(t1, {
		isEndpoint(value, key, trie)
		{
			return (key === '$') && (value === 1);
		},
	});

	arr.forEach(c =>
	{
		expect(c).toMatch(re);
	})

	expect(re).toMatchSnapshot();
	expect(t1).toMatchSnapshot();

});

test(`object`, () =>
{
	let t2 = {
		"1": {
			"$": 1,
		},
		"t": {
			"r": {
				"2": {
					"a": {
						"$": 1,
					},
				},
				"e": {
					"a": {
						"$": 1,
					},
				},
				"i": {
					"e": {
						"$": 1,
					},
				},
			},
		},
		"f": {
			"o": {
				"o": {
					"b": {
						"a": {
							"r": {
								"$": 1,
							},
							"z": {
								"$": 1,
							},
						},
					},
					"z": {
						"a": {
							"p": {
								"$": 1,
							},
							"$": 1,
						},
					},
				},
			},
		},
		"$": {
			"$": 1,
		},
	};

	let re = trieToRegExp(t2, {
		isEndpoint(value, key, trie)
		{
			return (key === '$') && (value === 1);
		},
	});

	arr.forEach(c =>
	{
		expect(c).toMatch(re);
	})

	expect(re).toMatchSnapshot();

});
