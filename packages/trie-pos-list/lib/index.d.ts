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
export declare namespace triePosList {
    export var allPos: typeof import(".").allPos;
    export var allPosMax: typeof import(".").allPosMax;
    export var validPos: typeof import(".").validPos;
    export var triePosList: typeof import(".").triePosList;
    var _a: typeof import(".").triePosList;
    export { _a as default };
}
export default triePosList;
