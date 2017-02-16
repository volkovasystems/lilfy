"use strict";

const lilfy = require( "./lilfy.js" );

let value = lilfy( "hello" );
console.log( value );
console.log( lilfy.revert( value ) );
