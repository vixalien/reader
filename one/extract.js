const { Handler } = require('htmlmetaparser');
const { Parser } = require('htmlparser2');

let getData = function (html, url) {
	return new Promise(function (resolve, reject) {
		const handler = new Handler(
		  (err, result) => {
		  	if (err) return reject(err);
		  	return resolve(result);
		  },
		  {
		    url
		  }
		);

		// Create a HTML parser with the handler.
		const parser = new Parser(handler, { decodeEntities: true });
		parser.write(html);
		parser.done();
	})
}

// function _splitTitle (title) {
//   var betterTitle;
//   var commonSeparatingCharacters = [' | ', ' _ ', ' - ', '«', '»', '—'];

//   commonSeparatingCharacters.forEach(function(char) {
//     var tmpArray = title.split(char);
//     if (tmpArray.length > 1) {
//       if (betterTitle) return betterTitle;
//       return tmpArray[0].trim();
//     }
//   });

//   return title;
// };

let extract = async function (document, url) {
	let html = document.serialize();

	let data = await getData(html, url);

	this.data = data;

	return {
		title: getTitle(data, document.window.document),
		excerpt: getDescription(data),
		siteName: getSiteName(data, url),
		author: getAuthor(data),
		date: getDate(data),
		image: getImage(data),
	}
}

module.exports = extract;

function getTitle (data, document) {
	let title = data?.rdfa?.['@graph']?.['og:title'] ||
		data?.rdfa?.['twitter']?.title ||
		data?.jsonld?.headline ||
		data?.html?.title

	if(!title) {
  	let firstHead = document.getElementsByTagName('h1')[0]
  	if (firstHead) title = firstHead.textContent;
  }

  return title;
}

function getDescription (data) {
	return data?.rdfa?.[0]?.['og:description']?.[0]?.['@value'] ||
		data?.twitter?.description ||
		data?.html?.description
}

function getAuthor (data) {
	return data?.rdfa?.[0]?.['article:author']?.[0]?.['@value'] ||
		data?.jsonld?.[0]?.author?.[0]?.name ||
		data?.html?.author
}

function getSiteName (data, url) {
	return data?.jsonld?.[0]?.publisher?.name ||
		data?.rdfa?.[0]?.['og:site_name']?.[0]?.['@value'] ||
		data?.twitter?.['app:name:iphone'] ||
		data?.twitter?.['app:name'] ||
		data?.twitter?.creator ||
		new URL(url).host
}

function getDate (data) {
	return data?.rdfa?.[0]?.['article:published_time']?.[0]?.['@value'] ||
		data?.jsonld?.[0]?.datePublished
}

function getImage (data) {
	return data?.rdfa?.[0]?.['og:image']?.[0]?.['@value'] ||
		data?.twitter?.['image:src'] ||
		data?.twitter?.image ||
		data?.jsonld?.[0]?.image?.url
}