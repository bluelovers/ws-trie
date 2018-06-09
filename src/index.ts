
import create, { ITrieRaw } from './create';
import append from './append';
import checkPrefix from './checkPrefix';
import recursePrefix from './recursePrefix';
import utils, { isEndpoint, isString, split, throwMsg } from './utils';
import config, { END_VALUE } from './config';
import permutations from './permutations';
import recurseRandomWord from './recurseRandomWord';
import trieToRegExp, { IOptionsAll as ITrieToRegExpOptionsAll, IOptions as ITrieToRegExpOptions } from 'trie-regex';

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
			throw(throwMsg('parameter Array', typeof input));
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
	load(obj: ITrieRaw<T>): this
	load<R>(obj: ITrieRaw<R>): this
	load(obj): this
	load(obj)
	{
		this[SYM_RAW] = obj;

		return this;
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
			throw(throwMsg('parameter string', typeof word));
		}

		const reducer = (...params) =>
		{
			// @ts-ignore
			return append(...params);
		};



		const input = split(word.toLowerCase());
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
			throw(throwMsg('parameter string', typeof word));
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
	isPrefix(prefix: string): prefix is string
	{
		if (typeof prefix !== 'string' || prefix === '')
		{
			throw(throwMsg('string prefix', typeof prefix));
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
			throw(throwMsg('string prefix', typeof strPrefix));
		}

		if (typeof sorted !== 'boolean')
		{
			throw(throwMsg('sort parameter as boolean', typeof sorted));
		}

		if (!this.isPrefix(strPrefix))
		{
			return [];
		}

		const { prefixNode } = checkPrefix(this[SYM_RAW], strPrefix);

		return recursePrefix(prefixNode, strPrefix, sorted);
	}

	/**
	 * Get a random word in the trie with the given prefix
	 * @returns String
	 */
	getRandomWordWithPrefix(strPrefix?: string): string
	getRandomWordWithPrefix(...argv): string
	{
		let strPrefix: string;

		if (argv.length)
		{
			strPrefix = argv[0];

			if (!this.isPrefix(strPrefix))
			{
				return '';
			}
		}
		else
		{
			strPrefix = '';
		}

		const { prefixNode } = checkPrefix(this[SYM_RAW], strPrefix);

		return recurseRandomWord(prefixNode, strPrefix);
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
			throw(throwMsg('sort parameter as boolean', typeof sorted));
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
			throw(throwMsg('string word', typeof word));
		}

		const { prefixFound, prefixNode } = checkPrefix<T>(this[SYM_RAW], word);

		if (prefixFound)
		{
			// @ts-ignore
			return prefixNode[config.END_WORD] === config.END_VALUE;
		}

		return false;
	}

	isAnagrams(letters: string): letters is string
	{
		if (typeof letters !== 'string')
		{
			throw(throwMsg('string letters', typeof letters));
		}

		if (letters.length < PERMS_MIN_LEN)
		{
			throw(throwMsg(`at least ${PERMS_MIN_LEN} letters`, letters.length));
		}

		// @ts-ignore
		return letters
	}

	/**
	 * Get a list of valid anagrams that can be made from the given letters
	 * @returns Array
	 */
	getAnagrams(letters: string)
	{
		this.isAnagrams(letters);

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
		this.isAnagrams(letters);

		return permutations(letters, this[SYM_RAW], {
			type: 'sub-anagram',
		});
	}

	toRegExp<R = RegExp>(flags?: string, options?: ITrieToRegExpOptions): R
	toRegExp<R>(flags?: string, options?: ITrieToRegExpOptionsAll<R>): ReturnType<typeof trieToRegExp>
	toRegExp<R>(flags?, options?)
	{
		if (!flags || !isString(flags))
		{
			flags = 'u';
		}

		options = Object.assign({
			disableEscaped: true,
			isEndpoint,

			jsescOptions: {
				'es6': true,
				'minimal': false,
			},

		}, options);

		return trieToRegExp<R>(this.tree(), flags, options);
	}

}

export function createTrie<T = typeof END_VALUE>(input: string[], ...argv)
{
	return new Trie<T>(input, ...argv);
}

createTrie.prototype = Trie.prototype;

export default createTrie
