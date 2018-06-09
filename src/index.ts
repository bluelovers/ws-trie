import create, { ITrieRaw } from './create';
import append from './append';
import checkPrefix from './checkPrefix';
import recursePrefix from './recursePrefix';
import utils from './utils';
import config, { END_VALUE } from './config';
import permutations from './permutations';

const PERMS_MIN_LEN = config.PERMS_MIN_LEN;

export const SYM_RAW = Symbol('trie');

export type IInput<T> = string[];
export type IInputMap<T> = [string, T][];

export class Trie<T = typeof END_VALUE>
{
	[SYM_RAW]: ITrieRaw<T>;

	constructor(input: IInput<T>, ...argv)
	{
		if (!Array.isArray(input))
		{
			throw(`Expected parameter Array, received ${typeof input}`);
		}

		const trie = create<T>([...input], ...argv);

		this[SYM_RAW] = trie;
	}

	/**
	 * Get the generated raw trie object
	 */
	tree()
	{
		return this[SYM_RAW];
	}

	/**
	 * Get a string representation of the trie
	 */
	dump(spacer: string | number = 0)
	{
		return utils.stringify(this[SYM_RAW], spacer);
	}

	/**
	 * Add a new word to the trie
	 */
	addWord(word: string)
	{
		if (typeof word !== 'string' || word === '')
		{
			throw(`Expected parameter string, received ${typeof word}`);
		}

		const reducer = (...params) =>
		{
			// @ts-ignore
			return append(...params);
		};

		const input = word.toLowerCase().split('');
		input.reduce(reducer, this[SYM_RAW]);

		return this;
	}

	/**
	 * Remove an existing word from the trie
	 */
	removeWord(word: string)
	{
		if (typeof word !== 'string' || word === '')
		{
			throw(`Expected parameter string, received ${typeof word}`);
		}

		const { prefixFound, prefixNode } = checkPrefix(this[SYM_RAW], word);

		if (prefixFound)
		{
			delete prefixNode[config.END_WORD];
		}

		return this;
	}

	/**
	 * Check a prefix is valid
	 * @returns Boolean
	 */
	isPrefix(prefix: string)
	{
		if (typeof prefix !== 'string' || prefix === '')
		{
			throw(`Expected string prefix, received ${typeof prefix}`);
		}

		const { prefixFound } = checkPrefix(this[SYM_RAW], prefix);

		return prefixFound;
	}

	/**
	 * Get a list of all words in the trie with the given prefix
	 * @returns Array
	 */
	getPrefix(strPrefix: string, sorted = true)
	{
		if (typeof strPrefix !== 'string' || strPrefix === '')
		{
			throw(`Expected string prefix, received ${typeof strPrefix}`);
		}

		if (typeof sorted !== 'boolean')
		{
			throw(`Expected sort parameter as boolean, received ${typeof sorted}`);
		}

		if (!this.isPrefix(strPrefix))
		{
			return [];
		}

		const { prefixNode } = checkPrefix(this[SYM_RAW], strPrefix);

		return recursePrefix(prefixNode, strPrefix, sorted);
	}

	/**
	 * Count the number of words with the given prefixSearch
	 * @returns Number
	 */
	countPrefix(strPrefix: string)
	{
		const prefixes = this.getPrefix(strPrefix);

		return prefixes.length;
	}

	/**
	 * Get all words in the trie
	 * @returns Array
	 */
	getWords(sorted = true)
	{
		if (typeof sorted !== 'boolean')
		{
			throw(`Expected sort parameter as boolean, received ${typeof sorted}`);
		}
		return recursePrefix<T>(this[SYM_RAW], '', sorted);
	}

	/**
	 * Check the existence of a word in the trie
	 * @returns Boolean
	 */
	hasWord(word: string)
	{
		if (typeof word !== 'string')
		{
			throw(`Expected string word, received ${typeof word}`);
		}

		const { prefixFound, prefixNode } = checkPrefix<T>(this[SYM_RAW], word);

		if (prefixFound)
		{
			// @ts-ignore
			return prefixNode[config.END_WORD] === config.END_VALUE;
		}

		return false;
	}

	/**
	 * Get a list of valid anagrams that can be made from the given letters
	 * @returns Array
	 */
	getAnagrams(letters: string)
	{
		if (typeof letters !== 'string')
		{
			throw(`Anagrams expected string letters, received ${typeof letters}`);
		}

		if (letters.length < PERMS_MIN_LEN)
		{
			throw(`getAnagrams expects at least ${PERMS_MIN_LEN} letters`);
		}

		return permutations(letters, this[SYM_RAW], {
			type: 'anagram',
		});
	}

	/**
	 * Get a list of all sub-anagrams that can be made from the given letters
	 * @returns Array
	 */
	getSubAnagrams(letters: string)
	{
		if (typeof letters !== 'string')
		{
			throw(`Expected string letters, received ${typeof letters}`);
		}

		if (letters.length < PERMS_MIN_LEN)
		{
			throw(`getSubAnagrams expects at least ${PERMS_MIN_LEN} letters`);
		}

		return permutations(letters, this[SYM_RAW], {
			type: 'sub-anagram',
		});
	}
}

export function createTrie<T = typeof END_VALUE>(input: string[], ...argv)
{
	return new Trie<T>(input, ...argv);
}

createTrie.prototype = Trie.prototype;

export default createTrie
