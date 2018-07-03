import AhoCorasick from '..';

var actual, i, len, ref, word;

var ac = new AhoCorasick();

ref = ['say', 'she', 'shr', 'he', 'her'];
for (i = 0, len = ref.length; i < len; i++)
{
	word = ref[i];
	ac.add(word, {
		word: word
	});
}

ac.build_fail();

console.dir(ac, {
	depth: null,
	colors: true,
});

actual = {};

ac.search('yasherhs', function (found_word)
{
	if (actual[found_word] == null)
	{
		actual[found_word] = 0;
	}
	return actual[found_word]++;
});

console.dir(actual, {
	depth: null,
	colors: true,
});
