/**
 * Created by user on 2018/7/4/004.
 */
export declare function allPos(words: string, positions: {
    [k: string]: string[];
    [i: number]: string[];
}): {
    [k: string]: string[];
    [i: number]: string[];
};
export declare function allPosMax(words: string, positions: {
    [k: string]: string[];
    [i: number]: string[];
}, limit?: number): {
    [k: string]: string[];
    [i: number]: string[];
};
export declare function validPos(positions: {
    [k: string]: string[];
    [i: number]: string[];
}): boolean;
export declare function triePosList(words: string, positions: {
    [k: string]: string[];
    [i: number]: string[];
}): {
    [k: string]: string[];
    [i: number]: string[];
};
export default triePosList;
