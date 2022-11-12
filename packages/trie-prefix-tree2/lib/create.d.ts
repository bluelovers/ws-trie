import { END_WORD, END_VALUE, END_DEF } from './config';
import { IInput } from './index';
export type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;
export interface ITrieNode<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
    '$$'?: ITrieNodeValue<T>;
    [END_WORD]?: ITrieNodeValue<T>;
}
export interface ITrieNodeValue<T = typeof END_VALUE> {
    [k: string]: T;
    [END_DEF]: string;
}
export interface ITrieRaw<T = typeof END_VALUE> {
    [k: string]: ITrieNode<T>;
}
export declare function create<T>(input: IInput<T>, ...argv: any[]): ITrieRaw<T>;
export default create;
