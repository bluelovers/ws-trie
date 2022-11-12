/**
 * Created by user on 2020/6/16.
 */
import Trie from './trie';
export type IAhoCorasickCallback<T> = (value: string, data: T[], offset: number, node: Trie<T>) => void;
export type IAhoCorasickResult<T = any> = {
    /**
     * keyword: position[]
     */
    matches: {
        [k: string]: number[];
    };
    /**
     * position: keyword[]
     */
    positions: {
        [k: number]: string[];
    };
    /**
     * keyword: count
     */
    count: {
        [k: string]: number;
    };
    /**
     * keyword: data
     */
    data: {
        [k: string]: T[];
    };
};
