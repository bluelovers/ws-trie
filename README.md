# Trie Prefix Tree

This is a [Trie](https://en.wikipedia.org/wiki/Trie) implementation written in JavaScript, with insert and remove capability. It can be used to search a predefined dictionary for prefixes, check a prefix exists and retrieve a list of anagrams and sub-anagrams based on given letters.

## What is a Trie?

A Trie (also known as a prefix-tree) is a data structure for storing strings in a tree. Each branch in the tree represents a single character which allows for fast and efficient depth-first searching. Let's say we have a dictionary with the words: CAR, CAT and CURL. We can visualise the trie like this:

![trie data structure](/trie.jpg)

## Installation

Pull down dependencies:

```
npm install
```

```
npm test
```

## How to Use

To use the Trie, install and save it to your package dependencies:

```
npm install trie-prefix-tree2
```

To create a new Trie:

```ts
var trie = require('trie-prefix-tree2').trie;

// using ES2015 Modules
import trie from 'trie-prefix-tree2';
```

Instantiate the Trie:

```javascript
var myTrie = trie(['cat', 'cats', 'dogs', 'elephant', 'tiger']);
```

Trie functionality:

```javascript
// retrieve a stringified dump of the Trie object
myTrie.dump(); // { c: { a: { t: $: 1 }, s: 1 ... }}

// optionally pass in spacer parameter to format the output string
myTrie.dump(2); // equivalent of JSON.stringify(obj, null, 2);
```

```javascript
// retrieve the Trie object instance
myTrie.tree();
```

addWord

```javascript
// add a new word to the Trie
myTrie.addWord('lion');
```

removeWord

```javascript
// remove an existing word from the Trie
myTrie.removeWord('dogs');
```

Adding and removing words can be chained:

```javascript
myTrie.addWord('hello').removeWord('hello');
```

Prefix searching:

```javascript
// check if a prefix exists:
myTrie.isPrefix('do'); // true
myTrie.isPrefix('z'); // false
```

countPrefix

```javascript
// count prefixes
myTrie.countPrefix('c'); // 2
```

getPrefix

```javascript
// get an array of words with the passed in prefix
myTrie.getPrefix('c'); // ['cat', 'cats']

// Pass false as the second parameter to disable 
// output being sorted alphabetically
// this is useful when your dictionary is already sorted
// and will therefore save performance
myTrie.getPrefix('c', false); // ['cat', 'cats']
```

getRandomWordWithPrefix

```javascript
// get a random word at a prefix
myTrie.getRandomWordWithPrefix('c'); // 'cat'
myTrie.getRandomWordWithPrefix('c'); // 'cats'
```

### Other:

getWordsAll

```javascript
// retrieve a full list of words in the Trie
// the output array is automatically sorted
myTrie.getWordsAll(); // ['cat', 'cats', 'elephant', 'lion', 'tiger']

// pass false to disable the output being sorted
// this is useful when your dictionary is already sorted
// and will therefore save performance
myTrie.getWordsAll(false); // ['cat', 'cats', 'elephant', 'tiger', 'lion']
```

hasWord

```javascript
// check if a word exists in the Trie
myTrie.hasWord('elephant'); // true
myTrie.hasWord('zoo'); // false
```

getAnagrams

```javascript
// generate a list of valid anagrams from the given letters
myTrie.getAnagrams('act'); // ['cat'];
```

getSubAnagrams

```javascript
// generate a list of valid sub-anagrams from the given letters
myTrie.getSubAnagrams('ctalion'); ['cat', 'cats', 'lion'];
```

## Credits

Credit goes to [Kent C. Dodds](https://github.com/kentcdodds) for providing the awesome 'How to Create an Open Source JavaScript Library' course, available on [egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library).

## License

This project is referenced under the MIT license and is free to use and distribute.

MIT @ Lyndsey Browning
