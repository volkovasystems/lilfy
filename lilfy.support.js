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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpbGZ5LnN1cHBvcnQuanMiXSwibmFtZXMiOlsiZmFsenkiLCJyZXF1aXJlIiwiaGFyZGVuIiwibHpTdHJpbmciLCJzeHR5NCIsInJldmVydCIsImRhdGEiLCJFcnJvciIsInRlc3QiLCJ0b2tlbiIsInNwbGl0IiwiZGVjb21wcmVzc0Zyb21FbmNvZGVkVVJJQ29tcG9uZW50IiwiZGVjb2RlIiwibGlsZnkiLCJsZW5ndGgiLCJjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudCIsIkRhdGUiLCJub3ciLCJqb2luIiwiZW5jb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2REEsSUFBTUEsUUFBUUMsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNQyxTQUFTRCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1FLFdBQVdGLFFBQVMsV0FBVCxDQUFqQjtBQUNBLElBQU1HLFFBQVFILFFBQVMsT0FBVCxDQUFkOztBQUVBLElBQU1JLFNBQVMsU0FBU0EsTUFBVCxDQUFpQkMsSUFBakIsRUFBdUI7QUFDckM7Ozs7Ozs7O0FBUUEsS0FBSU4sTUFBT00sSUFBUCxLQUFpQixPQUFPQSxJQUFQLElBQWUsUUFBcEMsRUFBOEM7QUFDN0MsUUFBTSxJQUFJQyxLQUFKLENBQVcsY0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBSSxDQUFHLG1DQUFGLENBQXdDQyxJQUF4QyxDQUE4Q0YsSUFBOUMsQ0FBTCxFQUEyRDtBQUMxRCxTQUFPQSxJQUFQO0FBQ0E7O0FBRUQsS0FBSUcsUUFBUUgsS0FBS0ksS0FBTCxDQUFZLEdBQVosQ0FBWjs7QUFFQUosUUFBT0csTUFBTyxDQUFQLENBQVA7O0FBRUEsS0FBSUEsTUFBTyxDQUFQLE1BQWUsSUFBbkIsRUFBeUI7QUFDeEJILFNBQU9ILFNBQVNRLGlDQUFULENBQTRDTCxJQUE1QyxDQUFQOztBQUVBLEVBSEQsTUFHTSxJQUFJRyxNQUFPLENBQVAsTUFBZSxHQUFuQixFQUF3QjtBQUM3QkgsU0FBT0YsTUFBT0UsSUFBUCxFQUFjTSxNQUFkLEVBQVA7QUFDQTs7QUFFRCxRQUFPTixJQUFQO0FBQ0EsQ0E3QkQ7O0FBK0JBLElBQU1PLFFBQVEsU0FBU0EsS0FBVCxDQUFnQlAsSUFBaEIsRUFBc0I7QUFDbkM7Ozs7Ozs7O0FBUUEsS0FBSU4sTUFBT00sSUFBUCxLQUFpQixPQUFPQSxJQUFQLElBQWUsUUFBcEMsRUFBOEM7QUFDN0MsUUFBTSxJQUFJQyxLQUFKLENBQVcsY0FBWCxDQUFOO0FBQ0E7O0FBRUQsS0FBTSxtQ0FBRixDQUF3Q0MsSUFBeEMsQ0FBOENGLElBQTlDLENBQUosRUFBMEQ7QUFDekQsU0FBT0EsSUFBUDtBQUNBOztBQUVELEtBQU1BLEtBQUtRLE1BQUwsR0FBYyxDQUFoQixHQUFzQixLQUExQixFQUFpQztBQUNoQ1IsU0FBT0gsU0FBU1ksNkJBQVQsQ0FBd0NULElBQXhDLENBQVA7O0FBRUFBLFNBQU8sQ0FBRSxJQUFGLEVBQVFBLElBQVIsRUFBY1UsS0FBS0MsR0FBTCxFQUFkLEVBQTRCQyxJQUE1QixDQUFrQyxHQUFsQyxDQUFQOztBQUVBLEVBTEQsTUFLSztBQUNKWixTQUFPRixNQUFPRSxJQUFQLEVBQWNhLE1BQWQsRUFBUDs7QUFFQWIsU0FBTyxDQUFFLEdBQUYsRUFBT0EsSUFBUCxFQUFhVSxLQUFLQyxHQUFMLEVBQWIsRUFBMkJDLElBQTNCLENBQWlDLEdBQWpDLENBQVA7QUFDQTs7QUFFRCxRQUFPWixJQUFQO0FBQ0EsQ0E3QkQ7O0FBK0JBSixPQUFRLFFBQVIsRUFBa0JHLE1BQWxCLEVBQTBCUSxLQUExQjs7QUFFQU8sT0FBT0MsT0FBUCxHQUFpQlIsS0FBakIiLCJmaWxlIjoibGlsZnkuc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyo7XHJcblx0QG1vZHVsZS1saWNlbnNlOlxyXG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcblx0XHRAbWl0LWxpY2Vuc2VcclxuXHJcblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXHJcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cclxuXHJcblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuXHRcdFNPRlRXQVJFLlxyXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcclxuXHJcblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxyXG5cdFx0e1xyXG5cdFx0XHRcInBhY2thZ2VcIjogXCJsaWxmeVwiLFxyXG5cdFx0XHRcInBhdGhcIjogXCJsaWxmeS9saWxmeS5qc1wiLFxyXG5cdFx0XHRcImZpbGVcIjogXCJsaWxmeS5qc1wiLFxyXG5cdFx0XHRcIm1vZHVsZVwiOiBcImxpbGZ5XCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb25cIlxyXG5cdFx0XHRdLFxyXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxyXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvbGlsZnkuZ2l0XCIsXHJcblx0XHRcdFwidGVzdFwiOiBcImxpbGZ5LXRlc3QuanNcIixcclxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxyXG5cdFx0fVxyXG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cclxuXHJcblx0QG1vZHVsZS1kb2N1bWVudGF0aW9uOlxyXG5cdFx0Q29udmVydCBhbnkgc3RyaW5nIGRhdGEgdG8gVVJJIGVuY29kZWQgY29tcHJlc3NlZCBiYXNlIDY0IGZvcm1hdC5cclxuXHJcblx0XHRXaGVuIHN0cmluZyBkYXRhIHJlYWNoZXMgMzUwMDAgYnl0ZXMgaXQgdXNlcyBsei1zdHJpbmcgdG8gY29tcHJlc3MgdGhlIGRhdGEuXHJcblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxyXG5cclxuXHRAaW5jbHVkZTpcclxuXHRcdHtcclxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXHJcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXHJcblx0XHRcdFwibHpTdHJpbmdcIjogXCJsei1zdHJpbmdcIixcclxuXHRcdFx0XCJzeHR5NFwiOiBcInN4dHk0XCJcclxuXHRcdH1cclxuXHRAZW5kLWluY2x1ZGVcclxuKi9cclxuXHJcbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XHJcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcclxuY29uc3QgbHpTdHJpbmcgPSByZXF1aXJlKCBcImx6LXN0cmluZ1wiICk7XHJcbmNvbnN0IHN4dHk0ID0gcmVxdWlyZSggXCJzeHR5NFwiICk7XHJcblxyXG5jb25zdCByZXZlcnQgPSBmdW5jdGlvbiByZXZlcnQoIGRhdGEgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcImRhdGE6cmVxdWlyZWRcIjogXCJzdHJpbmdcIlxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGlmKCBmYWx6eSggZGF0YSApIHx8IHR5cGVvZiBkYXRhICE9IFwic3RyaW5nXCIgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGRhdGFcIiApO1xyXG5cdH1cclxuXHJcblx0aWYoICEoIC9eeHsxLDJ9XFwtW2EtekEtWjAtOVxcJV0rP1xcLVxcZHsxM30kLyApLnRlc3QoIGRhdGEgKSApe1xyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRsZXQgdG9rZW4gPSBkYXRhLnNwbGl0KCBcIi1cIiApO1xyXG5cclxuXHRkYXRhID0gdG9rZW5bIDEgXTtcclxuXHJcblx0aWYoIHRva2VuWyAwIF0gPT09IFwieHhcIiApe1xyXG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudCggZGF0YSApO1xyXG5cclxuXHR9ZWxzZSBpZiggdG9rZW5bIDAgXSA9PT0gXCJ4XCIgKXtcclxuXHRcdGRhdGEgPSBzeHR5NCggZGF0YSApLmRlY29kZSggKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59O1xyXG5cclxuY29uc3QgbGlsZnkgPSBmdW5jdGlvbiBsaWxmeSggZGF0YSApe1xyXG5cdC8qO1xyXG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwiZGF0YTpyZXF1aXJlZFwiOiBcInN0cmluZ1wiXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0aWYoIGZhbHp5KCBkYXRhICkgfHwgdHlwZW9mIGRhdGEgIT0gXCJzdHJpbmdcIiApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgZGF0YVwiICk7XHJcblx0fVxyXG5cclxuXHRpZiggKCAvXnh7MSwyfVxcLVthLXpBLVowLTlcXCVdKz9cXC1cXGR7MTN9JC8gKS50ZXN0KCBkYXRhICkgKXtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0aWYoICggZGF0YS5sZW5ndGggKiAyICkgPiAzNTAwMCApe1xyXG5cdFx0ZGF0YSA9IGx6U3RyaW5nLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KCBkYXRhICk7XHJcblxyXG5cdFx0ZGF0YSA9IFsgXCJ4eFwiLCBkYXRhLCBEYXRlLm5vdyggKSBdLmpvaW4oIFwiLVwiICk7XHJcblxyXG5cdH1lbHNle1xyXG5cdFx0ZGF0YSA9IHN4dHk0KCBkYXRhICkuZW5jb2RlKCApO1xyXG5cclxuXHRcdGRhdGEgPSBbIFwieFwiLCBkYXRhLCBEYXRlLm5vdyggKSBdLmpvaW4oIFwiLVwiICk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gZGF0YTtcclxufTtcclxuXHJcbmhhcmRlbiggXCJyZXZlcnRcIiwgcmV2ZXJ0LCBsaWxmeSApO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBsaWxmeTtcclxuIl19
//# sourceMappingURL=lilfy.support.js.map
