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
var ac, actual, i, len, ref, word;

ac = new AhoCorasick();

ref = ['say', 'she', 'shr', 'he', 'her'];
for (i = 0, len = ref.length; i < len; i++) {
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

actual = {};

ac.search('yasherhs', function(found_word) {
  if (actual[found_word] == null) {
    actual[found_word] = 0;
  }
  return actual[found_word]++;
});

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
