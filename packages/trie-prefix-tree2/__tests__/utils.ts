import utils from '../src/utils';

describe('Utility methods', () =>
{

	describe('copying objects', () =>
	{
		const input = Object.freeze({
			a: {
				b: {
					c: {}
				}
			}
		});
		let copied = utils.objectCopy(input);

		it('deep copies an object', () =>
		{
			expect(copied).to.deep.equal(input);
			expect(utils.objectCopy()).to.deep.equal({});
		});

		it('mutated copy is different to the original input', () =>
		{
			copied.x = 1;
			expect(copied).not.to.equal(input);
		});
	});

	it('stringifying objects', () =>
	{
		expect(utils.stringify({})).to.equal('{}');
		expect(utils.stringify()).to.equal('');
		expect(utils.stringify(123)).to.equal('123');
	});
});
