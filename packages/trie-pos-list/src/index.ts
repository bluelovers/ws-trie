/**
 * Created by user on 2018/7/4/004.
 */

import { array_unique } from 'array-hyper-unique';
// @ts-ignore
import equals from 'deep-eql';

export interface IPositions
{
	[k: string]: string[];

	[i: number]: string[];
}

export function allPos(words: string, positions: IPositions): IPositions
{
	let i = 0;
	const ks = Object.keys(positions) as any as number[];
	const len = words.length;

	let j = 0;

	const ret: IPositions = {};

	while (i < len)
	{
		if (positions[i])
		{
			ret[j] ||= [];

			if (j !== i)
			{
				ret[j].push(words.slice(j, i));
			}

			ret[i] ||= [];
			ret[i] = positions[i].slice();

			// eslint-disable-next-line @typescript-eslint/no-loop-func
			ret[i].forEach(function (w)
			{
				let i4: number;
				let i2: number;
				let i3: number;
				for (i2 = 1; i2 < w.length; i2++)
				{
					i3 = i + i2;

					if (positions[i3])
					{
						const s = w.slice(0, i2);

						i4 = i3 - 1;

						ret[i4] ||= [];

						ret[i4].push(s);
					}
				}

				ks.forEach(function (i5)
				{
					if (i5 > i3)
					{
						const s = words.slice(i3, i5);

						ret[i3] ||= [];

						ret[i3].push(s);
					}

					if (i5 > i)
					{
						const s = words.slice(i, i5);

						ret[i] ||= [];

						ret[i].push(s);
					}
				});
			});

			j = i + 1;
		}

		i++;
	}

	if (j !== i)
	{
		const s = words.slice(j);

		ret[j] ||= [];

		ret[j].push(s);
	}

	for (const i in ret)
	{
		ret[i] = array_unique(ret[i]);
		ret[i].sort();
	}

	return ret;
}

export function allPosMax(words: string, positions: IPositions, limit = 5): IPositions
{
	let ret = allPos(words, positions);

	let _do = true;
	let i = 0;
	let ret2: IPositions;

	limit = Number(limit);

	limit = limit > 0 ? limit : 5;

	while (_do && limit > i++)
	{
		ret2 = allPos(words, ret);
		_do = !equals(ret, ret2);
		ret = ret2;
	}

	return ret;
}

export function validPos(positions: IPositions)
{
	return Object.keys(positions)
		.every(function (v)
		{
			return (
				v.toString() === Number(v).toString()
				&& positions[v]
				&& Array.isArray(positions[v])
			);
		})
		;
}

export function triePosList(words: string, positions: IPositions)
{
	return allPos(words, positions);
}

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(triePosList, "__esModule", { value: true });

	Object.defineProperty(triePosList, 'triePosList', { value: triePosList });
	Object.defineProperty(triePosList, 'default', { value: triePosList });

	Object.defineProperty(triePosList, 'allPos', { value: allPos });
	Object.defineProperty(triePosList, 'allPosMax', { value: allPosMax });
	Object.defineProperty(triePosList, 'validPos', { value: validPos });

}

export default triePosList;
