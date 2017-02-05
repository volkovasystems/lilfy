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
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
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
			"protype": "protype",
			"sxty4": "sxty4"
		}
	@end-include
*/

var falzy = require("falzy");
var harden = require("harden");
var lzString = require("lz-string");
var protype = require("protype");
var sxty4 = require("sxty4");

var revert = function revert(data) {
	/*;
 	@meta-configuration:
 		{
 			"data:required": "string"
 		}
 	@end-meta-configuration
 */

	if (falzy(data) || !protype(data, STRING)) {
		throw new Error("invalid data");
	}

	if (!/^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/.test(data)) {
		return data;
	}

	var token = data.split("-");

	data = token[1];

	if (token[0] === "xx") {
		data = lzString.decompressFromEncodedURIComponent(data);
	} else if (token[0] === "x") {
		data = sxty4(data).decode();
	}

	return data;
};

var lilfy = function lilfy(data) {
	/*;
 	@meta-configuration:
 		{
 			"data:required": "string"
 		}
 	@end-meta-configuration
 */

	if (falzy(data) || !protype(data, STRING)) {
		throw new Error("invalid data");
	}

	if (/^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/.test(data)) {
		return data;
	}

	if (data.length * 2 > 35000) {
		data = lzString.compressToEncodedURIComponent(data);

		data = ["xx", data, Date.now()].join("-");
	} else {
		data = sxty4(data).encode();

		data = ["x", data, Date.now()].join("-");
	}

	return data;
};

harden("revert", revert, lilfy);

module.exports = lilfy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbGZ5LmpzIl0sIm5hbWVzIjpbImZhbHp5IiwicmVxdWlyZSIsImhhcmRlbiIsImx6U3RyaW5nIiwicHJvdHlwZSIsInN4dHk0IiwicmV2ZXJ0IiwiZGF0YSIsIlNUUklORyIsIkVycm9yIiwidGVzdCIsInRva2VuIiwic3BsaXQiLCJkZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQiLCJkZWNvZGUiLCJsaWxmeSIsImxlbmd0aCIsImNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50IiwiRGF0ZSIsIm5vdyIsImpvaW4iLCJlbmNvZGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZEQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsV0FBV0YsUUFBUyxXQUFULENBQWpCO0FBQ0EsSUFBTUcsVUFBVUgsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTUksUUFBUUosUUFBUyxPQUFULENBQWQ7O0FBRUEsSUFBTUssU0FBUyxTQUFTQSxNQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUNyQzs7Ozs7Ozs7QUFRQSxLQUFJUCxNQUFPTyxJQUFQLEtBQWlCLENBQUNILFFBQVNHLElBQVQsRUFBZUMsTUFBZixDQUF0QixFQUErQztBQUM5QyxRQUFNLElBQUlDLEtBQUosQ0FBVyxjQUFYLENBQU47QUFDQTs7QUFFRCxLQUFJLENBQUcsbUNBQUYsQ0FBd0NDLElBQXhDLENBQThDSCxJQUE5QyxDQUFMLEVBQTJEO0FBQzFELFNBQU9BLElBQVA7QUFDQTs7QUFFRCxLQUFJSSxRQUFRSixLQUFLSyxLQUFMLENBQVksR0FBWixDQUFaOztBQUVBTCxRQUFPSSxNQUFPLENBQVAsQ0FBUDs7QUFFQSxLQUFJQSxNQUFPLENBQVAsTUFBZSxJQUFuQixFQUF5QjtBQUN4QkosU0FBT0osU0FBU1UsaUNBQVQsQ0FBNENOLElBQTVDLENBQVA7QUFFQSxFQUhELE1BR00sSUFBSUksTUFBTyxDQUFQLE1BQWUsR0FBbkIsRUFBd0I7QUFDN0JKLFNBQU9GLE1BQU9FLElBQVAsRUFBY08sTUFBZCxFQUFQO0FBQ0E7O0FBRUQsUUFBT1AsSUFBUDtBQUNBLENBN0JEOztBQStCQSxJQUFNUSxRQUFRLFNBQVNBLEtBQVQsQ0FBZ0JSLElBQWhCLEVBQXNCO0FBQ25DOzs7Ozs7OztBQVFBLEtBQUlQLE1BQU9PLElBQVAsS0FBaUIsQ0FBQ0gsUUFBU0csSUFBVCxFQUFlQyxNQUFmLENBQXRCLEVBQStDO0FBQzlDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGNBQVgsQ0FBTjtBQUNBOztBQUVELEtBQU0sbUNBQUYsQ0FBd0NDLElBQXhDLENBQThDSCxJQUE5QyxDQUFKLEVBQTBEO0FBQ3pELFNBQU9BLElBQVA7QUFDQTs7QUFFRCxLQUFNQSxLQUFLUyxNQUFMLEdBQWMsQ0FBaEIsR0FBc0IsS0FBMUIsRUFBaUM7QUFDaENULFNBQU9KLFNBQVNjLDZCQUFULENBQXdDVixJQUF4QyxDQUFQOztBQUVBQSxTQUFPLENBQUUsSUFBRixFQUFRQSxJQUFSLEVBQWNXLEtBQUtDLEdBQUwsRUFBZCxFQUE0QkMsSUFBNUIsQ0FBa0MsR0FBbEMsQ0FBUDtBQUVBLEVBTEQsTUFLSztBQUNKYixTQUFPRixNQUFPRSxJQUFQLEVBQWNjLE1BQWQsRUFBUDs7QUFFQWQsU0FBTyxDQUFFLEdBQUYsRUFBT0EsSUFBUCxFQUFhVyxLQUFLQyxHQUFMLEVBQWIsRUFBMkJDLElBQTNCLENBQWlDLEdBQWpDLENBQVA7QUFDQTs7QUFFRCxRQUFPYixJQUFQO0FBQ0EsQ0E3QkQ7O0FBK0JBTCxPQUFRLFFBQVIsRUFBa0JJLE1BQWxCLEVBQTBCUyxLQUExQjs7QUFFQU8sT0FBT0MsT0FBUCxHQUFpQlIsS0FBakIiLCJmaWxlIjoibGlsZnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImxpbGZ5XCIsXG5cdFx0XHRcInBhdGhcIjogXCJsaWxmeS9saWxmeS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwibGlsZnkuanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwibGlsZnlcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9saWxmeS5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImxpbGZ5LXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0Q29udmVydCBhbnkgc3RyaW5nIGRhdGEgdG8gVVJJIGVuY29kZWQgY29tcHJlc3NlZCBiYXNlIDY0IGZvcm1hdC5cblxuXHRcdFdoZW4gc3RyaW5nIGRhdGEgcmVhY2hlcyAzNTAwMCBieXRlcyBpdCB1c2VzIGx6LXN0cmluZyB0byBjb21wcmVzcyB0aGUgZGF0YS5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcblx0XHRcdFwibHpTdHJpbmdcIjogXCJsei1zdHJpbmdcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIixcblx0XHRcdFwic3h0eTRcIjogXCJzeHR5NFwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XG5jb25zdCBselN0cmluZyA9IHJlcXVpcmUoIFwibHotc3RyaW5nXCIgKTtcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xuY29uc3Qgc3h0eTQgPSByZXF1aXJlKCBcInN4dHk0XCIgKTtcblxuY29uc3QgcmV2ZXJ0ID0gZnVuY3Rpb24gcmV2ZXJ0KCBkYXRhICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwiZGF0YTpyZXF1aXJlZFwiOiBcInN0cmluZ1wiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggZmFsenkoIGRhdGEgKSB8fCAhcHJvdHlwZSggZGF0YSwgU1RSSU5HICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBkYXRhXCIgKTtcblx0fVxuXG5cdGlmKCAhKCAvXnh7MSwyfVxcLVthLXpBLVowLTlcXCVdKz9cXC1cXGR7MTN9JC8gKS50ZXN0KCBkYXRhICkgKXtcblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdGxldCB0b2tlbiA9IGRhdGEuc3BsaXQoIFwiLVwiICk7XG5cblx0ZGF0YSA9IHRva2VuWyAxIF07XG5cblx0aWYoIHRva2VuWyAwIF0gPT09IFwieHhcIiApe1xuXHRcdGRhdGEgPSBselN0cmluZy5kZWNvbXByZXNzRnJvbUVuY29kZWRVUklDb21wb25lbnQoIGRhdGEgKTtcblxuXHR9ZWxzZSBpZiggdG9rZW5bIDAgXSA9PT0gXCJ4XCIgKXtcblx0XHRkYXRhID0gc3h0eTQoIGRhdGEgKS5kZWNvZGUoICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn07XG5cbmNvbnN0IGxpbGZ5ID0gZnVuY3Rpb24gbGlsZnkoIGRhdGEgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJkYXRhOnJlcXVpcmVkXCI6IFwic3RyaW5nXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCBmYWx6eSggZGF0YSApIHx8ICFwcm90eXBlKCBkYXRhLCBTVFJJTkcgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGRhdGFcIiApO1xuXHR9XG5cblx0aWYoICggL154ezEsMn1cXC1bYS16QS1aMC05XFwlXSs/XFwtXFxkezEzfSQvICkudGVzdCggZGF0YSApICl7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRpZiggKCBkYXRhLmxlbmd0aCAqIDIgKSA+IDM1MDAwICl7XG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KCBkYXRhICk7XG5cblx0XHRkYXRhID0gWyBcInh4XCIsIGRhdGEsIERhdGUubm93KCApIF0uam9pbiggXCItXCIgKTtcblxuXHR9ZWxzZXtcblx0XHRkYXRhID0gc3h0eTQoIGRhdGEgKS5lbmNvZGUoICk7XG5cblx0XHRkYXRhID0gWyBcInhcIiwgZGF0YSwgRGF0ZS5ub3coICkgXS5qb2luKCBcIi1cIiApO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59O1xuXG5oYXJkZW4oIFwicmV2ZXJ0XCIsIHJldmVydCwgbGlsZnkgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsaWxmeTtcbiJdfQ==
