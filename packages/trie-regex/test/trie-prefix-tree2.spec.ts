import trie from 'trie-prefix-tree2';
import trieToRegExp from '../index';

const arr = ['trea', 'tr2a', 'trie', '1', 'foobar', 'foobaz', 'foozap', 'fooza', '$'];

test(`array`, () =>
{
	let t1 = trie(arr).tree();

	let re = trieToRegExp(t1);

	arr.forEach(c =>
	{
		expect(c).toMatch(re);
	})

	expect(re).toMatchSnapshot();
	expect(t1).toMatchSnapshot();

});
