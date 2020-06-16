/**
 * Created by user on 2018/7/3/003.
 */

import { Trie } from './src/trie'
// @ts-ignore
import { AhoCorasick, IAhoCorasickCallback } from './src/ahocorasick'
export * from './src/ahocorasick'

// @ts-ignore
export { AhoCorasick, Trie, IAhoCorasickCallback }

// @ts-ignore
export default AhoCorasick

// @ts-ignore
export = AhoCorasick

exports = Object.assign(AhoCorasick, exports);
