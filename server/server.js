const path = require("path");
const express = require("express");
const axios = require("axios");
const pf = require("./petfinderHelpers");
const user = require("../db/userQueries.js");
const breed = require("../db/breedQueries.js");
const app = express();
const port = 3030;
const { googleAPI } = require("../config.js");

app.use(express.static("client/dist"));
app.use(express.json());

app.listen(port, (e) => {
  console.log(
    e
      ? `Unable to start Express server: ${e}`
      : `Server Listening at http://localhost:${port}`
  );
});

app.get("/groomers", (req, res) => {
  let location = req.query.location;
  let distance = req.query.distance;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=pet+grooming&location=${location}&radius=${distance}&region=us&key=${googleAPI}`
    )
    .then((nearbyGroomers) => {
      res.send(nearbyGroomers.data.results.slice(0, 5));
    })
    .catch((errorGettingNearbyGroomers) => {
      res.sendStatus(400).send(errorGettingNearbyGroomers);
    });
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
  pf.getDogs(req.query)
    .then((dogs) => {
      res.send(dogs);
    })
    .catch((err) => {
      console.log("Error retrieving available dogs");
      res.sendStatus(400);
    });
});

app.get("/organization", (req, res) => {
  pf.getOrgName(req.query.id)
    .then((orgInfo) => {
      pf.getDogsAtOrg(req.query.id)
        .then((otherDogs) => {
          res.send([
            orgInfo.data.organization.name,
            orgInfo.data.organization.website,
            otherDogs.data.animals,
          ]);
        })
        .catch((err) => {
          console.log("Could not find dogs at org");
          res.sendStatus(400);
        });
    })
    .catch((err) => {
      console.log("Could not get org name");
      res.sendStatus(400);
    });
});

app.get("/nearbyOrgs", (req, res) => {
  console.log(req.query.lat, req.query.lng);
  let location = [req.query.lat, ",+", req.query.lng].join("");
  pf.getNearbyOrgs(location, req.query.distance)
    .then(({ data }) => {
      res.send(data.organizations);
    })
    .catch((err) => {
      console.log("Could not find nearby orgs");
      res.sendStatus(400);
    });
});

//{email: <"email_address">}

app.get("/userData", function (req, res) {
  user
    .getUser(req.query.email)
    .then((userData) => {
      res.send(userData);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//{name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, email: <"email_address">, lat: <lat>, lng: <lng>}
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

//{email: <"email_address>", name: <"name">, street_address: <"street_address">, city:<"city">, state: <"state"> zip: <"zip">, lat: <lat>, lng: <lng>}
app.put("/userData", function (req, res) {
  user
    .updateUser(req.body.email, req.body)
    .then((userData) => {
      res.send(userData).status(204);
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

  console.log('breed name', req.body);
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
  let filterObj = {};
  if (req.query.breed_group) {
    filterObj.breed_group = req.query.breed_group;
  }

  if (req.query.size) {
    filterObj.size = req.query.size;
  }
  if (req.query.temperament) {
    filterObj.temperament = req.query.temperament;
  }
  breed
    .getDogBreedByValue(filterObj)
    .then((filteredDogBreedsArr) => {
      res.send(filteredDogBreedsArr);
    })
    .catch((errorGettingDogInformation) => {
      res.sendStatus(400).send(errorGettingDogInformation);
    });
});
