const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser')
const read = require('one');

function fetchTimeout(...data) {
	return new Promise((resolve, reject) => {
		let timeout = setTimeout(() => reject('Fetching the page timed out after 20 seconds'), 20000);
		fetch(...data)
			.then((...result) => {
				clearTimeout(timeout);
				resolve(...result);
			})
			.catch(reject)
	})
}

app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.text());


app.get('/', async (req, res) => {
	res.send('hello');
})

app.get('/simple', async (req, res) => {
	let url = req.body.url || req.query.url;
	if (!url) res.json({ ok: false, error: "NOURL", detail: "No URL was provided" });
	try {
		url = new URL(url);
	} catch (err) {
		res.json({ ok: false, error: "INVALIDURL", detail: "An error occurred while parsing the given URL: " + err.toString() })
	}
	await fetch(url.href)
		.then(response => response.text())
		.then(complexText => read(complexText, url.href))
		.then(article => {
			res.json({ ok: true, data: article })
		})
		.catch(err => {
			console.log(err);
			res.json({ ok: false, error: "UNPARSEABELEURL", detail: "An error occured while loading/parsing the URL: " + err.toString() })
		})
})

app.listen(4304, () => {
	console.log('Listening at 4303')
})