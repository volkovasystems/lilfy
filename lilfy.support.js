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

var falzy = require("falzy");
var harden = require("harden");
var lzString = require("lz-string");
var sxty4 = require("sxty4");

var revert = function revert(data) {
	/*;
                                    	@meta-configuration:
                                    		{
                                    			"data:required": "string"
                                    		}
                                    	@end-meta-configuration
                                    */

	if (falzy(data) || typeof data != "string") {
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

	if (falzy(data) || typeof data != "string") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbGZ5LnN1cHBvcnQuanMiXSwibmFtZXMiOlsiZmFsenkiLCJyZXF1aXJlIiwiaGFyZGVuIiwibHpTdHJpbmciLCJzeHR5NCIsInJldmVydCIsImRhdGEiLCJFcnJvciIsInRlc3QiLCJ0b2tlbiIsInNwbGl0IiwiZGVjb21wcmVzc0Zyb21FbmNvZGVkVVJJQ29tcG9uZW50IiwiZGVjb2RlIiwibGlsZnkiLCJsZW5ndGgiLCJjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudCIsIkRhdGUiLCJub3ciLCJqb2luIiwiZW5jb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2REEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFdBQVdGLFFBQVMsV0FBVCxDQUFqQjtBQUNBLElBQU1HLFFBQVFILFFBQVMsT0FBVCxDQUFkOztBQUVBLElBQU1JLFNBQVMsU0FBU0EsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDckM7Ozs7Ozs7O0FBUUEsS0FBSU4sTUFBT00sSUFBUCxLQUFpQixPQUFPQSxJQUFQLElBQWUsUUFBcEMsRUFBOEM7QUFDN0MsUUFBTSxJQUFJQyxLQUFKLENBQVcsY0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSSxDQUFHLG1DQUFGLENBQXdDQyxJQUF4QyxDQUE4Q0YsSUFBOUMsQ0FBTCxFQUEyRDtBQUMxRCxTQUFPQSxJQUFQO0FBQ0E7O0FBRUQsS0FBSUcsUUFBUUgsS0FBS0ksS0FBTCxDQUFZLEdBQVosQ0FBWjs7QUFFQUosUUFBT0csTUFBTyxDQUFQLENBQVA7O0FBRUEsS0FBSUEsTUFBTyxDQUFQLE1BQWUsSUFBbkIsRUFBeUI7QUFDeEJILFNBQU9ILFNBQVNRLGlDQUFULENBQTRDTCxJQUE1QyxDQUFQOztBQUVBLEVBSEQsTUFHTSxJQUFJRyxNQUFPLENBQVAsTUFBZSxHQUFuQixFQUF3QjtBQUM3QkgsU0FBT0YsTUFBT0UsSUFBUCxFQUFjTSxNQUFkLEVBQVA7QUFDQTs7QUFFRCxRQUFPTixJQUFQO0FBQ0EsQ0E3QkQ7O0FBK0JBLElBQU1PLFFBQVEsU0FBU0EsS0FBVCxDQUFnQlAsSUFBaEIsRUFBc0I7QUFDbkM7Ozs7Ozs7O0FBUUEsS0FBSU4sTUFBT00sSUFBUCxLQUFpQixPQUFPQSxJQUFQLElBQWUsUUFBcEMsRUFBOEM7QUFDN0MsUUFBTSxJQUFJQyxLQUFKLENBQVcsY0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBTSxtQ0FBRixDQUF3Q0MsSUFBeEMsQ0FBOENGLElBQTlDLENBQUosRUFBMEQ7QUFDekQsU0FBT0EsSUFBUDtBQUNBOztBQUVELEtBQU1BLEtBQUtRLE1BQUwsR0FBYyxDQUFoQixHQUFzQixLQUExQixFQUFpQztBQUNoQ1IsU0FBT0gsU0FBU1ksNkJBQVQsQ0FBd0NULElBQXhDLENBQVA7O0FBRUFBLFNBQU8sQ0FBRSxJQUFGLEVBQVFBLElBQVIsRUFBY1UsS0FBS0MsR0FBTCxFQUFkLEVBQTRCQyxJQUE1QixDQUFrQyxHQUFsQyxDQUFQOztBQUVBLEVBTEQsTUFLSztBQUNKWixTQUFPRixNQUFPRSxJQUFQLEVBQWNhLE1BQWQsRUFBUDs7QUFFQWIsU0FBTyxDQUFFLEdBQUYsRUFBT0EsSUFBUCxFQUFhVSxLQUFLQyxHQUFMLEVBQWIsRUFBMkJDLElBQTNCLENBQWlDLEdBQWpDLENBQVA7QUFDQTs7QUFFRCxRQUFPWixJQUFQO0FBQ0EsQ0E3QkQ7O0FBK0JBSixPQUFRLFFBQVIsRUFBa0JHLE1BQWxCLEVBQTBCUSxLQUExQjs7QUFFQU8sT0FBT0MsT0FBUCxHQUFpQlIsS0FBakIiLCJmaWxlIjoibGlsZnkuc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwibGlsZnlcIixcblx0XHRcdFwicGF0aFwiOiBcImxpbGZ5L2xpbGZ5LmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJsaWxmeS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJsaWxmeVwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXG5cdFx0XHRcdFwiVmluc2UgVmluYWxvblwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9saWxmeS5naXRcIixcblx0XHRcdFwidGVzdFwiOiBcImxpbGZ5LXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0Q29udmVydCBhbnkgc3RyaW5nIGRhdGEgdG8gVVJJIGVuY29kZWQgY29tcHJlc3NlZCBiYXNlIDY0IGZvcm1hdC5cblxuXHRcdFdoZW4gc3RyaW5nIGRhdGEgcmVhY2hlcyAzNTAwMCBieXRlcyBpdCB1c2VzIGx6LXN0cmluZyB0byBjb21wcmVzcyB0aGUgZGF0YS5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJoYXJkZW5cIjogXCJoYXJkZW5cIixcblx0XHRcdFwibHpTdHJpbmdcIjogXCJsei1zdHJpbmdcIixcblx0XHRcdFwic3h0eTRcIjogXCJzeHR5NFwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XG5jb25zdCBselN0cmluZyA9IHJlcXVpcmUoIFwibHotc3RyaW5nXCIgKTtcbmNvbnN0IHN4dHk0ID0gcmVxdWlyZSggXCJzeHR5NFwiICk7XG5cbmNvbnN0IHJldmVydCA9IGZ1bmN0aW9uIHJldmVydCggZGF0YSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImRhdGE6cmVxdWlyZWRcIjogXCJzdHJpbmdcIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIGZhbHp5KCBkYXRhICkgfHwgdHlwZW9mIGRhdGEgIT0gXCJzdHJpbmdcIiApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGRhdGFcIiApO1xuXHR9XG5cblx0aWYoICEoIC9eeHsxLDJ9XFwtW2EtekEtWjAtOVxcJV0rP1xcLVxcZHsxM30kLyApLnRlc3QoIGRhdGEgKSApe1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0bGV0IHRva2VuID0gZGF0YS5zcGxpdCggXCItXCIgKTtcblxuXHRkYXRhID0gdG9rZW5bIDEgXTtcblxuXHRpZiggdG9rZW5bIDAgXSA9PT0gXCJ4eFwiICl7XG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudCggZGF0YSApO1xuXG5cdH1lbHNlIGlmKCB0b2tlblsgMCBdID09PSBcInhcIiApe1xuXHRcdGRhdGEgPSBzeHR5NCggZGF0YSApLmRlY29kZSggKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufTtcblxuY29uc3QgbGlsZnkgPSBmdW5jdGlvbiBsaWxmeSggZGF0YSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImRhdGE6cmVxdWlyZWRcIjogXCJzdHJpbmdcIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIGZhbHp5KCBkYXRhICkgfHwgdHlwZW9mIGRhdGEgIT0gXCJzdHJpbmdcIiApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGRhdGFcIiApO1xuXHR9XG5cblx0aWYoICggL154ezEsMn1cXC1bYS16QS1aMC05XFwlXSs/XFwtXFxkezEzfSQvICkudGVzdCggZGF0YSApICl7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHRpZiggKCBkYXRhLmxlbmd0aCAqIDIgKSA+IDM1MDAwICl7XG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KCBkYXRhICk7XG5cblx0XHRkYXRhID0gWyBcInh4XCIsIGRhdGEsIERhdGUubm93KCApIF0uam9pbiggXCItXCIgKTtcblxuXHR9ZWxzZXtcblx0XHRkYXRhID0gc3h0eTQoIGRhdGEgKS5lbmNvZGUoICk7XG5cblx0XHRkYXRhID0gWyBcInhcIiwgZGF0YSwgRGF0ZS5ub3coICkgXS5qb2luKCBcIi1cIiApO1xuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59O1xuXG5oYXJkZW4oIFwicmV2ZXJ0XCIsIHJldmVydCwgbGlsZnkgKTtcblxubW9kdWxlLmV4cG9ydHMgPSBsaWxmeTtcbiJdfQ==
//# sourceMappingURL=lilfy.support.js.map
