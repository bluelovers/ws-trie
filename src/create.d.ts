import { END_WORD, END_VALUE } from './config';
export interface ITrieNode<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
    [END_WORD]?: T;
}
export interface ITrieRaw<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
}
export declare function create<T>(input: string[]): ITrieRaw<T>;
export default create;
