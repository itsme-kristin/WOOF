const path = require("path");
const express = require("express");
const axios = require("axios");
const pf = require("./petfinderHelpers");
const user = require("../db/userQueries.js");
const breed = require("../db/breedQueries.js");
const app = express();
const port = 3030;

app.use(express.static("client/dist"));
app.use(express.json());

app.listen(port, (e) => {
  console.log(
    e
      ? `Unable to start Express server: ${e}`
      : `Server Listening at http://localhost:${port}`
  );
});

app.get("/user", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/research", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/search", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/animal", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/breed", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/signup", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/signin", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.get("/adopt", (req, res) => {
  pf.getDogs(req.body)
    .then((dogs) => {
      res.send(dogs);
    })
    .catch((err) => {
      console.log("Error retrieving available dogs");
      res.sendStatus(400);
    });
});

app.get("/organization", (req, res) => {
  pf.getDogsAtOrg(req.body.id)
    .then(({ data }) => {
      res.send(data);
    })

    .catch((err) => {
      console.log("Could not find dogs at org");
      res.sendStatus(400);
    });
});

//{email: <"email_address">}

app.get("/userData", function (req, res) {
  console.log("request email:", req.query);
  user
    .getUser(req.query.email)
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, email: <"email_address">, password: <"password">}
app.post("/userData", function (req, res) {
  user
    .addUser(req.body)
    .then((userData) => {
      res.send(userData).status(201);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{email: <"email_address>", {name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, password: <"password">}}
app.put("/userData", function (req, res) {
  user
    .updateUser(req.body.email, req.body)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, dogObj: {<dogObj>}}
app.put("/saveDog", function (req, res) {
  user
    .addSavedDog(req.body.email, req.body.dogObj)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, id: <dog_id>}
app.put("/deleteDog", function (req, res) {
  user
    .deleteSavedDog(req.body.email, req.body.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, breedObj: {<breedObj>}}
app.put("/saveBreed", function (req, res) {
  user
    .addDogBreed(req.body.email, req.body.breedObj)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{email: <"email_address">, id: <breed_id>}
app.put("/deleteBreed", function (req, res) {
  user
    .deleteDogBreed(req.body.email, req.body.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{name: "dog breed"}}
app.get("/breed-name", (req, res) => {
  const dogBreedName = req.body.name;

  breed
    .getDogBreedInformationByName(dogBreedName)
    .then((dogBreedInformation) => {
      res.send(dogBreedInformation);
    })
    .catch((errorGettingDogInformation) => {
      res.sendStatus(400);
    });
});

//breed-details?breed_name=breed+name&breed_group=breed+group&size=size&temperament=temperament

///breed-details?breed_name=Airedale+Terrier&breed_group=Terrier&size=medium&temperament=Friendly

//**filters on Front End need to be case sensitive**
app.get("/breed-details", (req, res) => {
  let breed_name = req.query.breed_name;
  let breed_group = req.query.breed_group;
  let size = req.query.size;
  let temperament = req.query.temperament;
  const filterObj = {
    breed_name: breed_name,
    breed_group: breed_group,
    size: size,
    temperament: temperament,
  };

  breed
    .getDogBreedByValue(filterObj)
    .then((filteredDogBreedsArr) => {
      res.send(filteredDogBreedsArr);
    })
    .catch((errorGettingDogInformation) => {
      res.sendStatus(400).send(errorGettingDogInformation);
    });
});
