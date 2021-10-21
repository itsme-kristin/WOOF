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
  mongoURI: "{{ Your MongoDB Cluster URL here }}",

  petfinderConfig: {
    "grant_type": "client_credentials",
    "client_id": "{{ Petfinder client_id }}",
    "client_secret": "{{ Petfinder client_secret"
  },

  googleAPI: "{{ google API key }}",

  FIREBASE_API_KEY: '{{ Firebase API Key }}',
  FIREBASE_AUTH_DOMAIN: '{{ Firebase Auth Domain URL }}',
  FIREBASE_PROJECT_ID: '{{ Firebase Project ID }}',
  FIREBASE_STORAGE_BUCKET: '{{ Firebase Storage URL }}',
  FIREBASE_MESSAGING_SENDER_ID: '{{ Firebase Messaging Sender ID }}',
  FIREBASE_APP_ID: '{{ Firebase App ID }}',
```

- Note, this file is ignored in .gitignore but can be used for any API(s) that require authentication.

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
