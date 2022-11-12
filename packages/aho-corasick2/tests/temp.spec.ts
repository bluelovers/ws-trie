/**
 * Created by user on 2018/7/3/003.
 */

import { AhoCorasick } from '../src';
import AhoCorasick2 from '../src';

test(`same`, () => {
	let a1 = new AhoCorasick;
	let a2 = new AhoCorasick2;

	let a11 = new AhoCorasick();
	let a22 = new AhoCorasick2();

	console.log(a1);
	console.log(a2);

	console.log(a11);
	console.log(a22);

	expect(AhoCorasick).toStrictEqual(AhoCorasick2)
})
