# WOOF

## Installation <a name="install"></a>

Woof requires both NodeJs and npm to run

1. Download the repo using git
```
git clone https://github.com/hratx-blue-ocean/WOOF.git
```
2. Install dependencies
```
npm install
```
3. Create a `config.js` file in the root directory:
```
module.exports = {
  mongoURI: <<Your Mongo DB link>>,
};
```
* Note, this file is ignored in .gitignore but can be used for any API(s) that require authentication.

4. Run the Webpack compiler

In Production:
```
npm run build
```
In Development:
```
npm run build-dev
```

5. Start the Server
```
npm start
```
