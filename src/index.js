import create from './create';
import append from './append';
import contains from './contains';

export default function(input) {
  if(!Array.isArray(input)) {
    throw(`Expected parameter Array, received ${typeof input}`);
  }

  const trie = create([...input]);

  return {
    /**
     * Get a string representation of the trie
    */
    dump(spacer = 0) {
      return JSON.stringify(trie, null, spacer);
    },

    /**
     * Add a new word to the trie
     */
    addWord(word) {
      if(typeof word !== 'string' || word === '') {
        throw(`Expected parameter string, received ${typeof word}`);
      }

      const reducer = (...params) => {
        return append(...params);
      };

      const input = word.toLowerCase().split('');
      input.reduce(reducer, trie);

      return this;
    },

    /**
     * Remove an existing word from the trie
     */
    removeWord(word) {
      if(typeof word !== 'string' || word === '') {
        throw(`Expected parameter string, received ${typeof word}`);
      }

      const found = contains(trie, word);

      if(found) {
        delete trie[word[0]];
      }

      return this;
    },

    /**
     * Check a prefix is valid
     * @returns Boolean
    */
    isPrefix(prefix) {
      if(typeof prefix !== 'string' || prefix === '') {
        throw(`Expected string prefix, received ${typeof prefix}`);
      }

      return contains(trie, prefix);
    },

    /**
    * Get a list of all words in the trie with the given prefix
    * @returns Array
    */
    getPrefix() {
      if(typeof prefix !== 'string' || prefix === '') {
        throw(`Expected string prefix, received ${typeof prefix}`);
      }


    },

    /**
    * Count the number of words with the given prefixSearch
    * @returns Number
    */
    countPrefix() {


    },

    /**
    * Get all words in the trie
    * @returns Array
    */
    getWords() {},

    /**
    * Get a list of words that can be made from the given letters
    * @returns Array
    */
    solveWords() {},


    /**
    * Check the existence of a word in the trie
    * @returns Boolean
    */
    hasWord() {}
  };
};
