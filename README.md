# About

> aho-corasick2 - Aho–Corasick string matching algorithm

#Installation

	$ npm install aho-corasick2

## Example

[API](src/ahocorasick.d.ts)

```ts
import * as AhoCorasick from 'aho-corasick2';
import AhoCorasick from 'aho-corasick2';
import AhoCorasick = require('aho-corasick2');
```
* search

```ts
var i, len, ref, word;

var ac = new AhoCorasick();

ref = ['say', 'she', 'shr', 'he', 'her', 'h', 'hers', 'his'];

for (i = 0, len = ref.length; i < len; i++)
{
	word = ref[i];
	ac.add(word, {
		word: word
	});
}

ac.build_fail();

console.dir(ac, {
	depth: null,
	colors: true,
});

let actual = ac.search('yasherhs');
/*
{ matches: { h: [ 3, 6 ], she: [ 2 ], he: [ 3 ], her: [ 3 ] },
  positions: { '2': [ 'she' ], '3': [ 'h', 'he', 'her' ], '6': [ 'h' ] },
  count: { h: 2, she: 1, he: 1, her: 1 },
  data:
   { h: [ { word: 'h' } ],
     she: [ { word: 'she' } ],
     he: [ { word: 'he' } ],
     her: [ { word: 'her' } ] } }
 */

console.dir(actual, {
	depth: null,
	colors: true,
});
```


## build graphviz dot

```coffee
		ac = new AhoCorasick()
		ac.add word, word:word for word in ['say', 'she', 'shr', 'he', 'her']
		ac.build_fail()
		console.log ac.to_dot()
```

save output as `trie.dot` and

    $ dot -Tpng trie.dot -o trie.png

You also need to install [GraphViz](http://www.graphviz.org/)

## Author

Dejian Xu
[Google+](https://plus.google.com/116305544434538996428?rel=author)

## Thanks

* Thomas Booth [https://github.com/tombooth/aho-corasick.js](https://github.com/tombooth/aho-corasick.js)
* glejeune node-graphviz [https://github.com/glejeune/node-graphviz](https://github.com/glejeune/node-graphviz)

## References
wikipedia: [Aho-Corasick](https://en.wikipedia.org/wiki/Aho-Corasick)
