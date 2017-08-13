
const assert = require( "assert" );
const lilfy = require( "./lilfy.js" );

let value = lilfy( "hello" );

assert.ok( value, "should not throw error" );

assert.equal( lilfy.revert( value ), "hello", "should be equal to 'hello'" );

console.log( "ok" );
