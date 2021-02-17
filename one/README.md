# @reader-app/one

`one` is an utility to get simple HTML from otherwise complex HTML.

## Installation

```sh
npm i @reader-app/one
```

## Example

```js
const one = require("@reader-app/one");

one(
	"<div>some complex html (even with ads)</div>",
	"http://site.com/where-you-got-this-from"
).then((article) => console.log(article));
```

> Note that `one` exports a Promise. Also, `one` never fetch anything, you must fetch data on your own.

## Usage

`one` accepts two parameters which are all required.

- **content**: Complex HTML to be transformed into readable HTML
- **url**: URL to resolve relative URLs,

`one` returns an object with the following properties:

- **url**: The provided URL.
- **title**: The resolved title of the document (Got from html, og, twitter or jsonld tags).
- **byline**: The author of the document as specified in the HTML.
- **dir**: Direction of the text (`rtl` or `ltr` or `null`).
- **content**: Simplified HTML.
- **textContent**: Simplified text (no HTML tags).
- **length**: The number of characters the document has.
- **excerpt**: Description of the document (Got from html, og, twitter or jsonld tags) or excerpt from first paragraph.
- **siteName**: The name of the site.
- **readable**: Whether or not the app thinks the given HTML is meant to be simplified.
- **author**: The name of the first or primary author.
- **date**: The date the article was created (Note that date can be in a variety of formats. You can use `new Date(article.date)` to handle most of them).
- **image**: The url of the hero image of the article.

## Example data

> Note that `content` and `textContent` are omitted for brevity.

```json
{
	"title": "How To Work with Date and Time in JavaScript using Date Objects | DigitalOcean",
	"byline": null,
	"dir": null,
	"content": "omitted",
	"textContent": "omitted as well",
	"siteName": "DigitalOcean",
	"readable": true,
	"author": "Tania Rascia",
	"date": "2017-10-19T20:15:53Z",
	"image": "https://community-cdn-digitalocean-com.global.ssl.fastly.net/variants/eqK1m9xGjBo7WaC62F3duT5E/035575f2985fe451d86e717d73691e533a1a00545d7230900ed786341dc3c882",
	"url": "https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript"
}
```
