const path = require('path');
const express = require('express');
const axios = require('axios');
const pf = require('./petfinderHelpers');

const app = express();
const port = 3030;

app.use(express.static('client/dist'));
app.use(express.json());

app.listen(port, e => {
  console.log(
    e
      ? `Unable to start Express server: ${e}`
      : `Server Listening at http://localhost:${port}`
  );
});

app.get('/user', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/research', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/search', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/animal', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get('/adopt', (req, res) => {
  if (
    !pf.tokenInfo.expiration ||
    pf.tokenInfo.expiration - new Date().getTime() < 1
  ) {
    pf.getAuthToken().then(() => {
      axios
        .get('https://api.petfinder.com/v2/animals', {
          headers: {
            Authorization: `${pf.tokenInfo.tokenType} ${pf.tokenInfo.token}`
          }
        })
        .then(({ data }) => {
          res.send(data);
        });
    });
  } else {
    axios
      .get('https://api.petfinder.com/v2/animals', {
        headers: {
          Authorization: `${pf.tokenInfo.tokenType} ${pf.tokenInfo.token}`
        }
      })
      .then(({ data }) => {
        res.send(data);
      });
  }
});

module.exports = app;
