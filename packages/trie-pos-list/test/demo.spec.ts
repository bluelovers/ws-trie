/**
 * Created by user on 2018/7/4/004.
 */
import triePosList, { allPosMax } from '..';
import equals from 'deep-eql';

let words = 'yasherhs';

/**
 * @see https://github.com/bluelovers/aho-corasick
 */
let positions = {
	'2': ['she'],
	'3': ['h', 'he', 'her'],
	'6': ['h']
};

let ret1 = triePosList(words, positions);

console.log(ret1);
/*
{ '0': [ 'ya' ],
  '2': [ 's', 'she', 'sher' ],
  '3': [ 'h', 'he', 'her' ],
  '4': [ 'er' ],
  '5': [ 'r' ],
  '6': [ 'h' ],
  '7': [ 's' ] }
 */

// more

let ret2 = allPosMax(words, ret1);
console.log(ret2);
/*
{ '0': [ 'y', 'ya', 'yas', 'yash', 'yashe', 'yasher', 'yasherh' ],
  '1': [ 'a', 'as', 'ash', 'ashe', 'asher', 'asherh' ],
  '2': [ 's', 'sh', 'she', 'sher', 'sherh' ],
  '3': [ 'h', 'he', 'her', 'herh' ],
  '4': [ 'e', 'er', 'erh' ],
  '5': [ 'r', 'rh' ],
  '6': [ 'h' ],
  '7': [ 's' ] }
 */

let ret3 = allPosMax(words, positions);
console.log(ret3);

console.log(`ret2 same as ret3:`, equals(ret2, ret3));

test(`triePosList(words, positions)`, () => {
	expect(ret1).toMatchSnapshot();
})

test(`allPosMax(words, ret1)`, () => {
	expect(ret2).toMatchSnapshot();
})

test(`allPosMax(words, positions)`, () => {
	expect(ret3).toMatchSnapshot();
})

test(`ret2 same as ret3`, () => {
	expect(ret2).toStrictEqual(ret3);
})
