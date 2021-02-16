const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser')
const read = require('one');

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
		.then(data => data.text())
		.then(text => read(text))
		.then(simple => {
			console.log('simple', simple)
			res.send(simple)
		})
		.catch(err => {
			return { ok: false, error: "UNPARSEABELEURL", detail: "An error occured while loading/parsing the URL: " + err.toString() }
		})
})

app.listen(4304, () => {
	console.log('Listening at 4303')
})