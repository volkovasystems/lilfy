"use strict";

/*;
	@test-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-test-license

	@test-configuration:
		{
			"package": "lilfy",
			"path": "lilfy/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/lilfy.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"lilfy": "lilfy"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const lilfy = require( "./lilfy.js" );
//: @end-server

//: @client:
const lilfy = require( "./lilfy.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:

describe( "lilfy", ( ) => {

	describe( "`lilfy( 'hello' )`", ( ) => {
		it( "should convert string 'hello' to URI encoded compressed base 64 format", ( ) => {
			assert.equal( typeof lilfy( "hello" ) == "string", true );
		} );
	} );

	describe( "`lilfy.revert( 'x-aGVsbG8%3D-1504150159927' )`", ( ) => {
		it( "should convert URI encoded compressed base 64 format to string format", ( ) => {
			let value = lilfy( "hello" );
			assert.equal( lilfy.revert( value ), "hello" );
		} );
	} );

} );

//: @end-server


//: @client:

describe( "lilfy", ( ) => {

	describe( "`lilfy( 'hello' )`", ( ) => {
		it( "should convert string 'hello' to URI encoded compressed base 64 format", ( ) => {
			assert.equal( typeof lilfy( "hello" ) == "string", true );
		} );
	} );

	describe( "`lilfy.revert( 'x-aGVsbG8%3D-1504150159927' )`", ( ) => {
		it( "should convert URI encoded compressed base 64 format to string format", ( ) => {
			let value = lilfy( "hello" );
			assert.equal( lilfy.revert( value ), "hello" );
		} );
	} );

} );

//: @end-client


//: @bridge:

describe( "lilfy", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`lilfy( 'hello' )`", ( ) => {
		it( "should convert string 'hello' to URI encoded compressed base 64 format", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return typeof lilfy( "hello" ) == "string";
				}

			).value;
			//: @end-ignore
			assert.equal( result, true );
		} );
	} );

	describe( "`lilfy.revert( 'x-aGVsbG8%3D-1504150159927' )`", ( ) => {
		it( "should convert URI encoded compressed base 64 format to string format", ( ) => {

			let result = browser.url( bridgeURL ).execute(

				function( ){
					let value = lilfy( "hello" );
					return lilfy.revert( value );
				}

			).value;

			assert.equal( result, "hello" );

		} );
	} );

} );

//: @end-bridge
