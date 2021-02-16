const FeedMe = require('feedme');
const http = require('https');

let data = {}

/*
RSS Format
type = rss 2.0
title
link
description

*/
http.get('https://vixalien.ga/feed/feed.rss', (res) => {
  let parser = new FeedMe(true);
  res.pipe(parser);
  parser.on('finish', () => {
  	text = parser.done();
  	text.items = text.items.map(item => {
  		delete item['content:encoded']
  		return item;
  	})
  	// 
    console.log(text);
  });
});

http.get('https://vixalien.ga/feed/feed.atom', (res) => {
  let parser = new FeedMe(true);
  res.pipe(parser);
  parser.on('finish', () => {
  	text = parser.done();
  	text.items = text.items.map(item => {
  		delete item['content']
  		return item;
  	})
    console.log(text);
  });
});

http.get('https://vixalien.ga/feed/feed.json', (res) => {
  let parser = new FeedMe(true);
  res.pipe(parser);
  parser.on('finish', () => {
  	text = parser.done();
  	text.items = text.items.map(item => {
  		delete item['content_html']
  		return item;
  	})
    console.log(text);
  });
});