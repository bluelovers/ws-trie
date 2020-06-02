/**
 * Created by user on 2018/6/9/009.
 */

import trie from 'trie-prefix-tree';
import trieToRegExp from '../index';

let arr = ['trea', 'tr2a', 'trie', '1', 'foobar', 'foobaz', 'foozap', 'fooza', '$'];

let t1 = trie(arr).tree();

console.log(trieToRegExp(t1, {
	isEndpoint(value, key, trie)
	{
		return (key === '$') && (value === 1);
	},
}));
// => /(?:foo(?:ba[rz]|zap?)|tr(?:2a|ea|ie)|\$|1)/u

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

console.log(trieToRegExp(t2, {
	isEndpoint(value, key, trie)
	{
		return (key === '$') && (value === 1);
	},
}));
// => /(?:foo(?:ba[rz]|zap?)|tr(?:2a|ea|ie)|\$|1)/u
