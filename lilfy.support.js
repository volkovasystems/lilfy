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
			"asea": "asea",
			"falzy": "falzy",
			"harden": "harden",
			"lzString": "lz-string",
			"protype": "protype"
		}
	@end-include
*/

var asea = require("asea");
var falzy = require("falzy");
var harden = require("harden");
var lzString = require("lz-string");
var protype = require("protype");

var lilfy = function lilfy(data) {
	/*;
 	@meta-configuration:
 		{
 			"data:required": "string"
 		}
 	@end-meta-configuration
 */

	if (!protype(data, STRING) || falzy(data)) {
		throw new Error("invalid data");
	}

	if (/^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/.test(data)) {
		return data;
	}

	if (data.length * 2 > 35000) {
		data = lzString.compressToBase64(data);

		data = encodeURIComponent(data);

		data = ["xx", data, Date.now()].join("-");
	} else {
		if (asea.client) {
			data = btoa(data);
		} else if (asea.server) {
			data = new Buffer(data).toString("base64");
		}

		data = encodeURIComponent(data);

		data = ["x", data, Date.now()].join("-");
	}

	return data;
};

harden("revert", function revert(data) {
	/*;
 	@meta-configuration:
 		{
 			"data:required": "string"
 		}
 	@end-meta-configuration
 */

	if (!protype(data, STRING) || falzy(data)) {
		throw new Error("invalid data");
	}

	if (!/^x{1,2}\-[a-zA-Z0-9\%]+?\-\d{13}$/.test(data)) {
		return data;
	}

	var token = data.split("-");

	data = token[1];

	data = decodeURIComponent(data);

	if (token[0] === "xx") {
		data = lzString.decompressFromBase64(data);
	} else if (token[0] === "x") {
		if (asea.client) {
			data = atob(data);
		} else if (asea.server) {
			data = new Buffer(data, "base64").toString("utf8");
		}
	}

	return data;
}, lilfy);

module.exports = lilfy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbGZ5LmpzIl0sIm5hbWVzIjpbImFzZWEiLCJyZXF1aXJlIiwiZmFsenkiLCJoYXJkZW4iLCJselN0cmluZyIsInByb3R5cGUiLCJsaWxmeSIsImRhdGEiLCJTVFJJTkciLCJFcnJvciIsInRlc3QiLCJsZW5ndGgiLCJjb21wcmVzc1RvQmFzZTY0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiRGF0ZSIsIm5vdyIsImpvaW4iLCJjbGllbnQiLCJidG9hIiwic2VydmVyIiwiQnVmZmVyIiwidG9TdHJpbmciLCJyZXZlcnQiLCJ0b2tlbiIsInNwbGl0IiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZGVjb21wcmVzc0Zyb21CYXNlNjQiLCJhdG9iIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2REEsSUFBTUEsT0FBT0MsUUFBUyxNQUFULENBQWI7QUFDQSxJQUFNQyxRQUFRRCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1FLFNBQVNGLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUcsV0FBV0gsUUFBUyxXQUFULENBQWpCO0FBQ0EsSUFBTUksVUFBVUosUUFBUyxTQUFULENBQWhCOztBQUVBLElBQU1LLFFBQVEsU0FBU0EsS0FBVCxDQUFnQkMsSUFBaEIsRUFBc0I7QUFDbkM7Ozs7Ozs7O0FBUUEsS0FBSSxDQUFDRixRQUFTRSxJQUFULEVBQWVDLE1BQWYsQ0FBRCxJQUE0Qk4sTUFBT0ssSUFBUCxDQUFoQyxFQUErQztBQUM5QyxRQUFNLElBQUlFLEtBQUosQ0FBVyxjQUFYLENBQU47QUFDQTs7QUFFRCxLQUFNLG1DQUFGLENBQXdDQyxJQUF4QyxDQUE4Q0gsSUFBOUMsQ0FBSixFQUEwRDtBQUN6RCxTQUFPQSxJQUFQO0FBQ0E7O0FBRUQsS0FBTUEsS0FBS0ksTUFBTCxHQUFjLENBQWhCLEdBQXNCLEtBQTFCLEVBQWlDO0FBQ2hDSixTQUFPSCxTQUFTUSxnQkFBVCxDQUEyQkwsSUFBM0IsQ0FBUDs7QUFFQUEsU0FBT00sbUJBQW9CTixJQUFwQixDQUFQOztBQUVBQSxTQUFPLENBQUUsSUFBRixFQUFRQSxJQUFSLEVBQWNPLEtBQUtDLEdBQUwsRUFBZCxFQUE0QkMsSUFBNUIsQ0FBa0MsR0FBbEMsQ0FBUDtBQUVBLEVBUEQsTUFPSztBQUNKLE1BQUloQixLQUFLaUIsTUFBVCxFQUFpQjtBQUNoQlYsVUFBT1csS0FBTVgsSUFBTixDQUFQO0FBRUEsR0FIRCxNQUdNLElBQUlQLEtBQUttQixNQUFULEVBQWlCO0FBQ3RCWixVQUFTLElBQUlhLE1BQUosQ0FBWWIsSUFBWixDQUFGLENBQXVCYyxRQUF2QixDQUFpQyxRQUFqQyxDQUFQO0FBQ0E7O0FBRURkLFNBQU9NLG1CQUFvQk4sSUFBcEIsQ0FBUDs7QUFFQUEsU0FBTyxDQUFFLEdBQUYsRUFBT0EsSUFBUCxFQUFhTyxLQUFLQyxHQUFMLEVBQWIsRUFBMkJDLElBQTNCLENBQWlDLEdBQWpDLENBQVA7QUFDQTs7QUFFRCxRQUFPVCxJQUFQO0FBQ0EsQ0F0Q0Q7O0FBd0NBSixPQUFRLFFBQVIsRUFBa0IsU0FBU21CLE1BQVQsQ0FBaUJmLElBQWpCLEVBQXVCO0FBQ3hDOzs7Ozs7OztBQVFBLEtBQUksQ0FBQ0YsUUFBU0UsSUFBVCxFQUFlQyxNQUFmLENBQUQsSUFBNEJOLE1BQU9LLElBQVAsQ0FBaEMsRUFBK0M7QUFDOUMsUUFBTSxJQUFJRSxLQUFKLENBQVcsY0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSSxDQUFHLG1DQUFGLENBQXdDQyxJQUF4QyxDQUE4Q0gsSUFBOUMsQ0FBTCxFQUEyRDtBQUMxRCxTQUFPQSxJQUFQO0FBQ0E7O0FBRUQsS0FBSWdCLFFBQVFoQixLQUFLaUIsS0FBTCxDQUFZLEdBQVosQ0FBWjs7QUFHQWpCLFFBQU9nQixNQUFPLENBQVAsQ0FBUDs7QUFFQWhCLFFBQU9rQixtQkFBb0JsQixJQUFwQixDQUFQOztBQUVBLEtBQUlnQixNQUFPLENBQVAsTUFBZSxJQUFuQixFQUF5QjtBQUN4QmhCLFNBQU9ILFNBQVNzQixvQkFBVCxDQUErQm5CLElBQS9CLENBQVA7QUFFQSxFQUhELE1BR00sSUFBSWdCLE1BQU8sQ0FBUCxNQUFlLEdBQW5CLEVBQXdCO0FBQzdCLE1BQUl2QixLQUFLaUIsTUFBVCxFQUFpQjtBQUNoQlYsVUFBT29CLEtBQU1wQixJQUFOLENBQVA7QUFFQSxHQUhELE1BR00sSUFBSVAsS0FBS21CLE1BQVQsRUFBaUI7QUFDdEJaLFVBQU8sSUFBSWEsTUFBSixDQUFZYixJQUFaLEVBQWtCLFFBQWxCLEVBQTZCYyxRQUE3QixDQUF1QyxNQUF2QyxDQUFQO0FBQ0E7QUFDRDs7QUFFRCxRQUFPZCxJQUFQO0FBRUEsQ0F0Q0QsRUFzQ0dELEtBdENIOztBQXdDQXNCLE9BQU9DLE9BQVAsR0FBaUJ2QixLQUFqQiIsImZpbGUiOiJsaWxmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwibGlsZnlcIixcblx0XHRcdFwicGF0aFwiOiBcImxpbGZ5L2xpbGZ5LmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJsaWxmeS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJsaWxmeVwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2xpbGZ5LmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwibGlsZnktdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRDb252ZXJ0IGFueSBzdHJpbmcgZGF0YSB0byBVUkkgZW5jb2RlZCBjb21wcmVzc2VkIGJhc2UgNjQgZm9ybWF0LlxuXG5cdFx0V2hlbiBzdHJpbmcgZGF0YSByZWFjaGVzIDM1MDAwIGJ5dGVzIGl0IHVzZXMgbHotc3RyaW5nIHRvIGNvbXByZXNzIHRoZSBkYXRhLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc2VhXCI6IFwiYXNlYVwiLFxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxuXHRcdFx0XCJselN0cmluZ1wiOiBcImx6LXN0cmluZ1wiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzZWEgPSByZXF1aXJlKCBcImFzZWFcIiApO1xuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IGx6U3RyaW5nID0gcmVxdWlyZSggXCJsei1zdHJpbmdcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5cbmNvbnN0IGxpbGZ5ID0gZnVuY3Rpb24gbGlsZnkoIGRhdGEgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJkYXRhOnJlcXVpcmVkXCI6IFwic3RyaW5nXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCAhcHJvdHlwZSggZGF0YSwgU1RSSU5HICkgfHwgZmFsenkoIGRhdGEgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGRhdGFcIiApO1xuXHR9XG5cblx0aWYoICggL154ezEsMn1cXC1bYS16QS1aMC05XFwlXSs/XFwtXFxkezEzfSQvICkudGVzdCggZGF0YSApICl7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRpZiggKCBkYXRhLmxlbmd0aCAqIDIgKSA+IDM1MDAwICl7XG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmNvbXByZXNzVG9CYXNlNjQoIGRhdGEgKTtcblxuXHRcdGRhdGEgPSBlbmNvZGVVUklDb21wb25lbnQoIGRhdGEgKTtcblxuXHRcdGRhdGEgPSBbIFwieHhcIiwgZGF0YSwgRGF0ZS5ub3coICkgXS5qb2luKCBcIi1cIiApO1xuXG5cdH1lbHNle1xuXHRcdGlmKCBhc2VhLmNsaWVudCApe1xuXHRcdFx0ZGF0YSA9IGJ0b2EoIGRhdGEgKTtcblxuXHRcdH1lbHNlIGlmKCBhc2VhLnNlcnZlciApe1xuXHRcdFx0ZGF0YSA9ICggbmV3IEJ1ZmZlciggZGF0YSApICkudG9TdHJpbmcoIFwiYmFzZTY0XCIgKTtcblx0XHR9XG5cblx0XHRkYXRhID0gZW5jb2RlVVJJQ29tcG9uZW50KCBkYXRhICk7XG5cblx0XHRkYXRhID0gWyBcInhcIiwgZGF0YSwgRGF0ZS5ub3coICkgXS5qb2luKCBcIi1cIiApO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59O1xuXG5oYXJkZW4oIFwicmV2ZXJ0XCIsIGZ1bmN0aW9uIHJldmVydCggZGF0YSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImRhdGE6cmVxdWlyZWRcIjogXCJzdHJpbmdcIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoICFwcm90eXBlKCBkYXRhLCBTVFJJTkcgKSB8fCBmYWx6eSggZGF0YSApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgZGF0YVwiICk7XG5cdH1cblxuXHRpZiggISggL154ezEsMn1cXC1bYS16QS1aMC05XFwlXSs/XFwtXFxkezEzfSQvICkudGVzdCggZGF0YSApICl7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRsZXQgdG9rZW4gPSBkYXRhLnNwbGl0KCBcIi1cIiApO1xuXG5cblx0ZGF0YSA9IHRva2VuWyAxIF07XG5cblx0ZGF0YSA9IGRlY29kZVVSSUNvbXBvbmVudCggZGF0YSApO1xuXG5cdGlmKCB0b2tlblsgMCBdID09PSBcInh4XCIgKXtcblx0XHRkYXRhID0gbHpTdHJpbmcuZGVjb21wcmVzc0Zyb21CYXNlNjQoIGRhdGEgKTtcblxuXHR9ZWxzZSBpZiggdG9rZW5bIDAgXSA9PT0gXCJ4XCIgKXtcblx0XHRpZiggYXNlYS5jbGllbnQgKXtcblx0XHRcdGRhdGEgPSBhdG9iKCBkYXRhICk7XG5cblx0XHR9ZWxzZSBpZiggYXNlYS5zZXJ2ZXIgKXtcblx0XHRcdGRhdGEgPSBuZXcgQnVmZmVyKCBkYXRhLCBcImJhc2U2NFwiICkudG9TdHJpbmcoIFwidXRmOFwiICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG5cbn0sIGxpbGZ5ICk7XG5cbm1vZHVsZS5leHBvcnRzID0gbGlsZnk7XG4iXX0=
