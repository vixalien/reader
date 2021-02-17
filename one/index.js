var sanitizeHtml = require('sanitize-html');
var { Readability, isProbablyReaderable, } = require('@mozilla/readability');
var { JSDOM } = require('jsdom');
var extract = require('./extract');

let parse = async (content, url) => {
	var unsanitizedDoc = new JSDOM(content, {
	  url
	});

  var doc = new JSDOM(sanitizeHtml(content), {
    url
  });

  var extractedData = await extract(unsanitizedDoc, url);

	var readable = isProbablyReaderable(doc.window.document)

	let reader = new Readability(doc.window.document);
	let article = reader.parse();

	article.readable = readable;

  // Merge previously extracted data
  for (let key in extractedData) {
    article[key] = extractedData[key] || article[key];
  }

  // Fix excerpt
  if (article.excerpt) {
    // Limit the excerpt to 170 characters, then remove the last word (it should be broken)
    article.excerpt = article.excerpt.substr(0, 170).replace(/ (\S)$/, '')
  }

  article.url = url;

	return article;
}

module.exports = parse