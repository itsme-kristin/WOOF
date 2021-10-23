<h1 align="center"> WOOF</h1>

## Meet the Dogg House team:

<img  align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/83591602?s=88&amp;v=4" width="44" height="44" alt="@aliciav-texas">

**Alicia Villanueva** - Project Manager<br>
[GitHub](https://github.com/aliciav-texas) • [LinkedIn](https://www.linkedin.com/in/alicia-villanueva-atx/)

<img  align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/85384798?s=88&amp;v=4" width="44" height="44" alt="@JohnathanBrennan">

**Johnathan Brennan** - Project Manager<br>
[GitHub](https://github.com/JohnathanBrennan) • [LinkedIn](https://www.linkedin.com/in/johnathan-brennan/)

<img align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/69761087?s=88&amp;v=4" width="44" height="44" alt="@bkern98">

**Ben Kern** - System Architect<br>
[GitHub](https://github.com/bkern98) • [LinkedIn](https://www.linkedin.com/in/benjamin-kern-4a7371184/)

<img align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/23545273?s=88&amp;v=4" width="44" height="44" alt="@UnlikelyHero">

**Don Vida** - UI Designer<br>
[GitHub](https://github.com/UnlikelyHero) • [LinkedIn](https://www.linkedin.com/in/donald-vida/)

<img align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/80354714?s=88&amp;v=4" width="44" height="44" alt="@mariaykim">

**Maria Kim** - UI Designer<br>
[GitHub](https://github.com/mariaykim) • [LinkedIn](https://www.linkedin.com/in/mariakim21/)

<img align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/84642987?s=88&amp;v=4" width="44" height="44" alt="@itsme-kristin">

**Kristen Gadgil** - Full Stack Engineer<br>
[GitHub](https://github.com/itsme-kristin) • [LinkedIn](https://www.linkedin.com/in/kristingadgil/)

<img align="left" class="avatar avatar-user" src="https://avatars.githubusercontent.com/u/85043190?s=88&amp;v=4" width="44" height="44" alt="@robwilliams-it">

**Rob Williams** - Full Stack Engineer<br>
[GitHub](https://github.com/robwilliams-it) • [LinkedIn](https://www.linkedin.com/in/rob-williams-swe/)

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
