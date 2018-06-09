/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

// @ts-ignore
declare global
{
	export var assert: Chai.Assert;
	export var expect: Chai.ExpectStatic;
	export var should: () => Chai.Should;
}

declare var assert: Chai.Assert;
declare var expect: Chai.ExpectStatic;
declare var should: () => Chai.Should;
