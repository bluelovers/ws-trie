'use strict';

var types = require('@lazy-trie/types');
var util = require('@lazy-trie/util');
var trieRegex = require('trie-regex');

function append(trie, letter, index, array) {
  trie[letter] = trie[letter] || {};
  trie = trie[letter];
  if (index === array.length - 1) {
    trie[types.END_WORD] = null;
  }
  return trie;
}

function create(input, ...argv) {
  if (!Array.isArray(input)) {
    throw new TypeError(`Expected parameter Array, received ${typeof input}`);
  }
  const trie = input.reduce((accumulator, item) => {
    util.split(item).reduce(append, accumulator);
    return accumulator;
  }, {});
  return trie;
}
function isEndpoint(value, key, trie) {
  return key === types.END_WORD;
}
function hasEndpoint(node) {
  return types.END_WORD in node;
}

function checkPrefix(prefixNode, prefix) {
  const input = util.split(prefix);
  const prefixFound = input.every((letter, index) => {
    if (!prefixNode[letter]) {
      return false;
    }
    return prefixNode = prefixNode[letter];
  });
  return {
    prefixFound,
    prefixNode
  };
}

function pushInOrder(word, prefixes) {
  let i = 0;
  while (i < prefixes.length) {
    if (word < prefixes[i]) {
      break;
    }
    i += 1;
  }
  prefixes.splice(i, 0, word);
  return prefixes;
}
function recursePrefix(node, prefix, sorted, prefixes = []) {
  let word = prefix;
  for (const branch in node) {
    if (branch === types.END_WORD) {
      if (sorted) {
        pushInOrder(word, prefixes);
      } else {
        prefixes.push(word);
      }
      word = '';
    }
    recursePrefix(node[branch], prefix + branch, sorted, prefixes);
  }
  return prefixes;
}

const END_VALUE = /*#__PURE__*/Object.freeze({});
const END_DEF = /*#__PURE__*/Symbol('default');
const PERMS_MIN_LEN = 2;

function permutations(letters, trie, opts = {
  type: 'anagram'
}) {
  if (typeof letters !== 'string') {
    throw new TypeError(`Permutations expects string letters, received ${typeof letters}`);
  }
  const words = [];
  const permute = (word, node, prefix = '') => {
    const wordIsEmpty = word.length === 0;
    const wordFound = words.includes(prefix);
    const endWordFound = hasEndpoint(node);
    if (wordIsEmpty && endWordFound && !wordFound) {
      words.push(prefix);
    }
    for (let i = 0, len = word.length; i < len; i++) {
      const letter = word[i];
      if (opts.type === 'sub-anagram') {
        if (endWordFound && !words.includes(prefix)) {
          words.push(prefix);
        }
      }
      if (node[letter]) {
        const remaining = word.substring(0, i) + word.substring(i + 1, len);
        permute(remaining, node[letter], prefix + letter);
      }
    }
    return words.sort();
  };
  return permute(letters, trie);
}

function recurseRandomWord(node, prefix) {
  const word = prefix;
  const branches = Object.keys(node);
  const branch = branches[Math.floor(Math.random() * branches.length)];
  if (branch === types.END_WORD) {
    return word;
  }
  return recurseRandomWord(node[branch], prefix + branch);
}

const SYM_RAW = /*#__PURE__*/Symbol('trie');
class Trie {
  constructor(input, options, ...argv) {
    if (!Array.isArray(input)) {
      throw util.throwMsg('parameter Array', typeof input);
    }
    this.options = Object.freeze({
      ignoreCase: true,
      ...this.options
    });
    if (this.options.mapMode) {
      this[SYM_RAW] = create([], ...argv);
      input.forEach(row => {
        const [key, value] = row;
        this.addWord(key, value);
      });
    } else {
      this[SYM_RAW] = create([], ...argv);
      input.forEach(key => {
        this.addWord(key);
      });
    }
  }
  tree() {
    return this[SYM_RAW];
  }
  load(obj) {
    this[SYM_RAW] = obj;
    return this;
  }
  dump(spacer = 0) {
    return util.stringify(this[SYM_RAW], spacer);
  }
  addWord(word, value = null) {
    util.isString(word, 'word is string');
    const reducer = (...params) => {
      return append(...params);
    };
    const key = this._key(word);
    const input = util.split(key);
    const node = input.reduce(reducer, this[SYM_RAW]);
    node[types.END_WORD] = node[types.END_WORD] || {};
    node[types.END_WORD][word] = value;
    node[types.END_WORD][END_DEF] = word;
    return this;
  }
  _key(word) {
    return this.options.ignoreCase ? word.toLowerCase() : word;
  }
  removeWord(word, all) {
    util.isString(word, 'word is string');
    const {
      prefixFound,
      prefixNode
    } = this._checkPrefix(word);
    if (prefixFound) {
      const node = prefixNode[types.END_WORD];
      if (!all && Object.keys(node).length > 1) {
        let bool;
        if (word in node) {
          delete node[word];
        } else if (node[END_DEF] in node) {
          delete node[node[END_DEF]];
          bool = true;
        }
        if (bool || word === node[END_DEF]) {
          node[END_DEF] = Object.keys(node)[0];
        }
      } else {
        delete prefixNode[types.END_WORD];
      }
    }
    return this;
  }
  _checkPrefix(prefix) {
    const key = this._key(prefix);
    return checkPrefix(this[SYM_RAW], key);
  }
  isPrefix(prefix) {
    util.isString(prefix, 'prefix is string');
    const {
      prefixFound
    } = this._checkPrefix(prefix);
    return prefixFound;
  }
  getPrefix(strPrefix, sorted = true) {
    util.isString(strPrefix, 'prefix is string');
    if (typeof sorted !== 'boolean') {
      throw util.throwMsg('sort parameter as boolean', typeof sorted);
    }
    if (!this.isPrefix(strPrefix)) {
      return [];
    }
    const {
      prefixNode
    } = this._checkPrefix(strPrefix);
    return recursePrefix(prefixNode, strPrefix, sorted);
  }
  getRandomWordWithPrefix(...argv) {
    let strPrefix;
    if (argv.length) {
      strPrefix = argv[0];
      if (!this.isPrefix(strPrefix)) {
        return '';
      }
    } else {
      strPrefix = '';
    }
    const {
      prefixNode
    } = this._checkPrefix(strPrefix);
    return recurseRandomWord(prefixNode, strPrefix);
  }
  countPrefix(strPrefix) {
    const prefixes = this.getPrefix(strPrefix);
    return prefixes.length;
  }
  getWordsAll(sorted = true) {
    if (typeof sorted !== 'boolean') {
      throw util.throwMsg('sort parameter as boolean', typeof sorted);
    }
    return recursePrefix(this[SYM_RAW], '', sorted);
  }
  hasWord(word) {
    if (typeof word !== 'string') {
      throw util.throwMsg('string word', typeof word);
    }
    if (word !== '') {
      const {
        prefixFound,
        prefixNode
      } = this._checkPrefix(word);
      if (prefixFound) {
        return hasEndpoint(prefixNode);
      }
    }
    return false;
  }
  getWordData(word, notChkDefault) {
    const node = this.getWordNode(word);
    if (node) {
      if (word in node) {
        return {
          key: word,
          value: node[word],
          matched: true
        };
      } else if (!notChkDefault && END_DEF in node) {
        let k = node[END_DEF];
        if (!(k in node)) {
          k = Object.keys(node)[0];
        }
        if (k in node) {
          return {
            key: k,
            value: node[k],
            matched: k === word
          };
        }
      }
    }
    return null;
  }
  getWordNode(word) {
    if (typeof word !== 'string') {
      throw util.throwMsg('string word', typeof word);
    }
    if (word !== '') {
      const {
        prefixFound,
        prefixNode
      } = this._checkPrefix(word);
      if (hasEndpoint(prefixNode)) {
        return prefixNode[types.END_WORD];
      }
    }
    return null;
  }
  getWordNodeKeys(word) {
    const node = this.getWordNode(word);
    if (node) {
      return Object.keys(node);
    }
    return null;
  }
  isAnagrams(letters) {
    if (typeof letters !== 'string') {
      throw util.throwMsg('string letters', typeof letters);
    }
    if (letters.length < PERMS_MIN_LEN) {
      throw util.throwMsg(`at least ${PERMS_MIN_LEN} letters`, letters.length);
    }
    return letters;
  }
  getAnagrams(letters) {
    this.isAnagrams(letters);
    return permutations(letters, this[SYM_RAW], {
      type: 'anagram'
    });
  }
  getSubAnagrams(letters) {
    this.isAnagrams(letters);
    return permutations(letters, this[SYM_RAW], {
      type: 'sub-anagram'
    });
  }
  toRegExp(flags, options) {
    if (!flags || !util.isString(flags)) {
      flags = 'u';
      if (this.options.ignoreCase) {
        flags += 'i';
      }
    }
    options = Object.assign({
      disableEscaped: true,
      isEndpoint,
      jsescOptions: {
        'es6': true,
        'minimal': false
      }
    }, options);
    return trieRegex.trieToRegExp(this.tree(), flags, options);
  }
}
function createTrie(...argv) {
  return new Trie(...argv);
}
Object.assign(createTrie, {
  prototype: Trie.prototype
});
{
  Object.defineProperty(createTrie, "__esModule", {
    value: true
  });
  Object.defineProperty(createTrie, 'createTrie', {
    value: createTrie
  });
  Object.defineProperty(createTrie, 'default', {
    value: createTrie
  });
  Object.defineProperty(createTrie, 'trie', {
    value: createTrie
  });
  Object.defineProperty(createTrie, 'Trie', {
    value: Trie
  });
  Object.defineProperty(createTrie, 'SYM_RAW', {
    value: SYM_RAW
  });
  Object.defineProperty(createTrie, 'END_VALUE', {
    value: END_VALUE
  });
  Object.defineProperty(createTrie, 'END_WORD', {
    value: types.END_WORD
  });
  Object.defineProperty(createTrie, 'END_DEF', {
    value: END_DEF
  });
  Object.defineProperty(createTrie, 'isEndpoint', {
    value: isEndpoint
  });
  Object.defineProperty(createTrie, 'hasEndpoint', {
    value: hasEndpoint
  });
}

module.exports = createTrie;
//# sourceMappingURL=index.cjs.development.cjs.map
