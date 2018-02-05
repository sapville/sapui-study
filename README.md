- Install globally http-server: `npm install -g http-server`
- (Optional) Install [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) globally and locally.
- Install [opn](https://www.npmjs.com/package/opn) locally: `npm install opn`
- Create file gulpfile.js with the following content
````javascript
const opn = require('opn');
opn('http://127.0.0.1:8080', {app: ['C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '--incognito']});
````
- Correct the path to Chrome application and, if needed, the URL
- Change directory to mvc-app-simple: `cd mvc-app-simple`
- Run command `http-server` in terminal
- Run gulpfile.js
- Stop the server hitting Ctrl-C keys
