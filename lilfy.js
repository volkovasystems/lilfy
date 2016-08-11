"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/lilfy.git",
			"test": "lilfy-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
	@end-module-documentation

	@include:
		{
			"asea": "asea",
			"harden": "harden"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var asea = require( "asea" );
	var harden = require( "harden" );
}

if( typeof window != "undefined" &&
	!( "asea" in window ) )
{
	throw new Error( "asea is not defined" );
}

if( asea.client &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

var lilfy = function lilfy( data ){
	/*;
		@meta-configuration:
			{
				"data:required": "string"
			}
		@end-meta-configuration
	*/

	if( typeof data != "string" ||
		!data )
	{
		throw new Error( "invalid data" );
	}

	if( ( /^x\-[a-zA-Z0-9\%]+?\-\d{13}$/ ).test( data ) ){
		return data;
	}

	if( asea.client ){
		data = btoa( data );

	}else if( asea.server ){
		data = ( new Buffer( data ) ).toString( "base64" );
	}

	data = encodeURIComponent( data );

	data = [ "x", data, Date.now( ) ].join( "-" );

	return data;
};

harden( "revert", function revert( data ){
	/*;
		@meta-configuration:
			{
				"data:required": "string"
			}
		@end-meta-configuration
	*/

	if( typeof data != "string" ||
		!data )
	{
		throw new Error( "invalid data" );
	}

	if( !( /^x\-[a-zA-Z0-9\%]+?\-\d{13}$/ ).test( data ) ){
		return data;
	}

	data = data.split( "-" )[ 1 ];

	data = decodeURIComponent( data );

	if( asea.client ){
		data = atob( data );

	}else if( asea.server ){
		data = new Buffer( data, "base64" ).toString( "utf8" );
	}

	return data;

}, lilfy );

if( asea.server ){
	module.exports = lilfy;
}
