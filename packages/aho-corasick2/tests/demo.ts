import AhoCorasick from '..';
import { array_unique } from 'array-hyper-unique';
import equals = require('deep-eql');

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
