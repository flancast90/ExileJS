### ExileJS
> A comprehensive banning library for NodeJS applications.

[![npm bundle size](https://img.shields.io/bundlephobia/min/exile-js) ![npm (scoped)](https://img.shields.io/npm/v/exile-js)](https://www.npmjs.com/package/exile-js)


### Install
**NPM Package**
```bash
$ npm install exile-js
```

**Dependencies**
```bash
$ npm install express-fingerprint
```


### Usage
1. Create a text file named ``blacklist.txt`` in the same directory as your node.js ``server`` file.
2. Add the below lines to your node.js ``server`` file
```javascript
const exile = require('exile-js');
// dependency initialisation
var Fingerprint = require('express-fingerprint')

// We will store user fingerprint here
var userid;

app.use(Fingerprint({
	parameters:[
		// Defaults
		Fingerprint.useragent,
		Fingerprint.acceptHeaders,
		Fingerprint.geoip,
	]
}))

app.get('*',function(req,res,next) {
	userid = req.fingerprint.hash;
})
```


### Accepted Args
```javascript
// bans a user given their browser fingerprint,
// which is obtained the first time the user goes to the site.
exile.ban(userId);

// checks if a user is banned or not.
exile.status(userId);

// unbans a previously banned user.
exile.unban(userId);
```


### License
MIT
