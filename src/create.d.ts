import { END_WORD, END_VALUE } from './config';
import { IInput } from './index';
export declare type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;
export interface ITrieNode<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
    '$$'?: T;
    [END_WORD]?: T;
}
export interface ITrieRaw<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
}
export declare function create<T>(input: IInput<T>, ...argv: any[]): ITrieRaw<T>;
export default create;
