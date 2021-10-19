const path = require('path');
const express = require('express');
const axios = require('axios');
const pf = require('./petfinderHelpers');
const user = require('../db/userQueries.js');
const breed = require('../db/breedQueries.js');
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
  pf.getDogs(req.body)
    .then(({ data }) => {
      res.send(data);
    })
    .catch(err => {
      console.log('Error retrieving available dogs');
      res.sendStatus(400);
    });
});

//{email: <"email_address">}
app.get('/userData', function (req, res) {
  user
    .getUser(req.body.email)
    .then(userData => {
      res.send(userData);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, email: <"email_address">, password: <"password">}
app.post('/userData', function (req, res) {
  user
    .addUser(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{email: <"email_address>", {name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, password: <"password">}}
app.put('/userData', function (req, res) {
  user
    .updateUser(req.body.email, req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, dogObj: {<dogObj>}}
app.put('/saveDog', function (req, res) {
  user
    .addSavedDog(req.body.email, req.body.dogObj)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, id: <dog_id>}
app.put('/deleteDog', function (req, res) {
  user
    .deleteSavedDog(req.body.email, req.body.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, breedObj: {<breedObj>}}
app.put('/saveBreed', function (req, res) {
  user
    .addDogBreed(req.body.email, req.body.breedObj)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, id: <breed_id>}
app.put('/deleteBreed', function (req, res) {
  user
    .deleteDogBreed(req.body.email, req.body.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

//{name: "dog breed"}}
app.get('/breed-name', (req, res) => {
  const dogBreedName = req.body.name;
  breed
    .getDogBreedInformationByName(dogBreedName)
    .then(dogBreedInformation => {
      res.send(dogBreedInformation);
    })
    .catch(errorGettingDogInformation => {
      res.sendStatus(400);
    });
});

//'/breed-details?property=property&value=value'
app.get('/breed-details', (req, res) => {
  let property = req.query.property;
  let value = req.query.value;
  breed
    .getDogBreedByValue(property, value)
    .then(filteredDogBreedArr => {
      res.send(filteredDogBreedArr);
    })
    .catch(errorGettingDogInformation => {
      res.sendStatus(400).send(errorGettingDogInformation);
    });
});
