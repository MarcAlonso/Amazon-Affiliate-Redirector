// ==UserScript==
// @name          Amazon Affiliate Fixer
// @namespace     
// @description	  Plugs Amazon Links To A Designated Affiliate
// @include	  *
// @run-at        document-end
// @version       1.0
// ==/UserScript==

// Set Up The Amazon Domain Regex
var am = "(http).*?(amazon\\.com)";
var amr = new RegExp(am, ["i"]);

// Set Up The Affiliate Regex Strings
var af1 = "(=)((?:[a-z][a-z]+))(-)(\\d+)";
var af2 = "(%3D)((?:[a-z][a-z]+))(-)(\\d+)";
var af3 = "((?:[a-z][a-z]+))(-)(\\d+)";

// Set Up The Affiliate Regex Objects
var af1r = new RegExp(".*?" + af1,["i"]);
var af2r = new RegExp(".*?" + af2,["i"]);
var af3r = new RegExp(".*?(/)" + af3,["i"]);
var af4r = new RegExp(".*?(\\?)",["i"]);

// The Affiliate String
var aff = "thmydoli-20";

// Loop through all  elements (links) in the page
var links = document.querySelectorAll('a');
for (var i = 0, len = links.length; i < len; i++) {
  if (amr.exec(links[i].href) != null) {
    if (af1r.exec(links[i].href) != null) {
      links[i].href = links[i].href.replace(new RegExp(af1,["i"]), "=" + aff);
    }
    else if (af2r.exec(links[i].href) != null) {
      links[i].href = links[i].href.replace(new RegExp(af2,["i"]), "%3D" + aff);
    }
    else if (af3r.exec(links[i].href) != null) {
      links[i].href = links[i].href.replace(new RegExp(af3,["i"]), aff);
    }
    else if (af4r.exec(links[i].href) != null) {
      links[i].href = links[i].href + "&tag=" + aff;
    }
    else {
      links[i].href = links[i].href + "/" + aff + "/";
    }
  }
}