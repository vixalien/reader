# reader

Reader is a service to read, save, sync and discover articles.

It contains many sub-packages. Here is a short description.

## one

Transforms article content into simple and clean text. (While removing styles, scripts, ads etc) and sanitize the content.

## feed

Discover and parse RSS & ATOM feeds.

## backend

Handles logins, feeds and etc. This is the main server that do all the cloud stuff.

## app

This is the UI(s) that serve as the frontend (what the user see.)

> Note: reader is WIP so it will inevitably change and some of the sub-packages may not be there yet or fully implemented.