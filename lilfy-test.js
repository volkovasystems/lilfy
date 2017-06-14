
const assert = require( "assert" );
const lilfy = require( "./lilfy.js" );

let value = lilfy( "hello" );
assert.ok( value );
assert.equal( lilfy.revert( value ), "hello", "should return 'hello'" );

console.log( "ok" );
