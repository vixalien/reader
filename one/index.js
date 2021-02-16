var sanitizeHtml = require('sanitize-html');
var { Readability, isProbablyReaderable, } = require('@mozilla/readability');
var { JSDOM } = require('jsdom');

let parse = (content, url) => {
	var doc = new JSDOM(sanitizeHtml(content), {
	  url
	});
	var readable = isProbablyReaderable(doc.window.document)
	var title = getTitle(doc.window.document);

	let reader = new Readability(doc.window.document);
	let article = reader.parse();

	article.title = article.title || title;
	article.readable = readable;
	return article;
}

getTitle = function(document) {
  var title = _findMetaTitle(document) || document.title
  if(!title) {
  	let firstHead = document.getElementsByTagName('h1')[0]
  	if (firstHead) title = firstHead.textContent;
  }
  var betterTitle;
  var commonSeparatingCharacters = [' | ', ' _ ', ' - ', '«', '»', '—'];

  commonSeparatingCharacters.forEach(function(char) {
    var tmpArray = title.split(char);
    if (tmpArray.length > 1) {
      if (betterTitle) return title;
      betterTitle = tmpArray[0].trim();
    }
  });

  return title;
};

function _findMetaTitle(document) {
  var metaTags = document.getElementsByTagName('meta');
  var tag;

  for(var i = 0; i < metaTags.length; i++) {
    tag = metaTags[i];

    if(tag.getAttribute('property') === 'og:title' || tag.getAttribute('name') === 'twitter:title'){
      return tag.getAttribute('content');
    }
  }
  return null;
}

module.exports = parse