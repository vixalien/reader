var read = require('node-readability');
var sanitizeHtml = require('sanitize-html');

var Typography = require('typography');

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: ['Avenir Next', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Georgia', 'serif'],
})

let template = (text) => {
	return (
`<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<style id="_typo">${typography.toString()}</style>
	</head>
	<body>
		<main>
			${text}
		</main>
	</body>
</html>
`
)
}

module.exports = function (data) {
	return new Promise((resolve, reject) => {
		read(data, function(err, article) {
	    if (err) {
	      reject(err);
	    } else {
	    	const content = article.content;
	    	content.title = article.title;
	      resolve(template(sanitizeHtml(content)));
	    }
	  })
	})
}
