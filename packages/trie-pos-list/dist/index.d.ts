/**
 * Created by user on 2018/7/4/004.
 */
export interface IPositions {
	[k: string]: string[];
	[i: number]: string[];
}
export declare function allPos(words: string, positions: IPositions): IPositions;
export declare function allPosMax(words: string, positions: IPositions, limit?: number): IPositions;
export declare function validPos(positions: IPositions): boolean;
export declare function triePosList(words: string, positions: IPositions): IPositions;

export {
	triePosList as default,
};

export {};
