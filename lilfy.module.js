"use strict";

/*;
	@module-license:
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
	@end-module-license

	@module-configuration:
		{
			"package": "lilfy",
			"path": "lilfy/lilfy.js",
			"file": "lilfy.js",
			"module": "lilfy",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/lilfy.git",
			"test": "lilfy-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Convert any string data to URI encoded compressed base 64 format.

		When string data reaches 35000 bytes it uses lz-string to compress the data.
	@end-module-documentation

	@include:
		{
			"falzy": "falzy",
			"harden": "harden",
			"lzString": "lz-string",
			"sxty4": "sxty4"
		}
	@end-include
*/

const falzy = require( "falzy" );
const harden = require( "harden" );
const lzString = require( "lz-string" );
const sxty4 = require( "sxty4" );

const revert = function revert( data ){
	/*;
		@meta-configuration:
			{
				"data:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( data ) || typeof data != "string" ){
		throw new Error( "invalid data" );
	}

	if( !( /^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/ ).test( data ) ){
		return data;
	}

	let token = data.split( "-" );

	data = token[ 1 ];

	if( token[ 0 ] === "xx" ){
		data = lzString.decompressFromEncodedURIComponent( data );

	}else if( token[ 0 ] === "x" ){
		data = sxty4( data ).decode( );
	}

	return data;
};

const lilfy = function lilfy( data ){
	/*;
		@meta-configuration:
			{
				"data:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( data ) || typeof data != "string" ){
		throw new Error( "invalid data" );
	}

	if( ( /^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/ ).test( data ) ){
		return data;
	}

	if( ( data.length * 2 ) > 35000 ){
		data = lzString.compressToEncodedURIComponent( data );

		data = [ "xx", data, Date.now( ) ].join( "-" );

	}else{
		data = sxty4( data ).encode( );

		data = [ "x", data, Date.now( ) ].join( "-" );
	}

	return data;
};

harden( "revert", revert, lilfy );

module.exports = lilfy;
