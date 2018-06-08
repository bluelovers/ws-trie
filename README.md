# trie-regex

    Create a regular expression from trie like object



## demo

* [API](index.d.ts)

```ts
import * as trie from 'trie-prefix-tree';
import trieToRegExp from 'trie-regex';

let arr = ['trea', 'tr2a', 'trie', '1', 'foobar', 'foobaz', 'foozap', 'fooza', '$'];

let t1 = trie(arr).tree();

console.log(trieToRegExp(t1));

let t2 = {
	"1": {
		"$": 1
	},
	"t": {
		"r": {
			"2": {
				"a": {
					"$": 1
				}
			},
			"e": {
				"a": {
					"$": 1
				}
			},
			"i": {
				"e": {
					"$": 1
				}
			}
		}
	},
	"f": {
		"o": {
			"o": {
				"b": {
					"a": {
						"r": {
							"$": 1
						},
						"z": {
							"$": 1
						}
					}
				},
				"z": {
					"a": {
						"p": {
							"$": 1
						},
						"$": 1
					}
				}
			}
		}
	},
	"$": {
		"$": 1
	}
};

console.log(trieToRegExp(t2, {
	isEndpoint(value, key, trie)
	{
		return (key === '$') && (value === 1);
	}
}));
```
