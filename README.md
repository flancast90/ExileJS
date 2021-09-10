### ExileJS
> A comprehensive banning library for NodeJS applications.

[![npm bundle size](https://img.shields.io/bundlephobia/min/exile-js) ![npm (scoped)](https://img.shields.io/npm/v/exile-js)](https://www.npmjs.com/package/exile-js)


### What Makes ExileJS Different?
Unlike other traditional banning softwares, ExileJS is unique in the fact that it uses browser fingerprints to ban users, as oppossed to the normal IP ban. This simple change not only makes ExileJS more modern than the other softwares, but also more effective, since it will not be confused by VPN's, proxies, or even Incognito tabs!

You think I'm lying? Test it out, and understand why ExileJS is truly **next-gen**!


### Install
**NPM Package**
```bash
$ npm install exile-js
```


### Usage
1. Create a text file named ``blacklist.txt`` in the same directory as your node.js ``server`` file.
2. Add the below lines to your node.js ``server`` file
```javascript
updated, changing now.
```

Still have questions? Check out the ``example`` folder for a working demo without an ``npm install``!


### Accepted Args
```javascript
// bans a user given their browser fingerprint,
// which is obtained the first time the user goes to the site.
exile.ban(userId);

// checks if a user is banned or not.
exile.check(userId);

// unbans a previously banned user.
exile.unban(userId);
```


### License
MIT
