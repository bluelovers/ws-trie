export declare function Trie(input: any): {
    /**
     * Get the generated raw trie object
     */
    tree(): import("./create").ITrieRaw<{}>;
    /**
     * Get a string representation of the trie
     */
    dump(spacer?: number): string;
    /**
     * Add a new word to the trie
     */
    addWord(word: any): any;
    /**
     * Remove an existing word from the trie
     */
    removeWord(word: any): any;
    /**
     * Check a prefix is valid
     * @returns Boolean
     */
    isPrefix(prefix: any): boolean;
    /**
     * Get a list of all words in the trie with the given prefix
     * @returns Array
     */
    getPrefix(strPrefix: any, sorted?: boolean): any[];
    /**
     * Count the number of words with the given prefixSearch
     * @returns Number
     */
    countPrefix(strPrefix: any): any;
    /**
     * Get all words in the trie
     * @returns Array
     */
    getWords(sorted?: boolean): any[];
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word: any): boolean;
    /**
     * Get a list of valid anagrams that can be made from the given letters
     * @returns Array
     */
    getAnagrams(letters: any): any[];
    /**
     * Get a list of all sub-anagrams that can be made from the given letters
     * @returns Array
     */
    getSubAnagrams(letters: any): any[];
};
export default Trie;
