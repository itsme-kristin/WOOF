const { User } = require('./index.js');
const axios = require('axios');
const { default: Email } = require('@mui/icons-material/Email');

const addUser = ({
  name,
  street_address,
  city,
  state,
  zip,
  lat,
  lng,
  email
}) => {
  return User.create({
    name: name,
    street_address: street_address,
    city: city,
    state: state,
    zip: zip,
    lat: lat,
    lng: lng,
    email: email,
    savedDogs: [],
    savedBreeds: []
  })
    .then(user => {
      return user;
    })
    .catch(err => {
      console.info('There was an error adding a user.');
    });
};

const getUser = email => {
  return User.findOne({ email })
    .then(user => {
      if (user === null) {
        throw new Error('No user found with this email');
      } else {
        return user;
      }
    })
    .catch(err => {
      console.log("Couldn't find user", err);
      return err;
    });
};

const updateUser = (
  email,
  { name, street_address, city, state, zip, lat, lng }
) => {
  return User.findOneAndUpdate(
    { email: email },
    {
      name: name,
      street_address: street_address,
      city: city,
      state: state,
      zip: zip,
      lat: lat,
      lng: lng
    }
  )
    .then(user => {
      if (user === null) {
        throw new Error('No user found with this email');
      } else {
        return getUser(email);
      }
    })
    .catch(err => {
      console.info('There was an error adding a user.');
    });
};

const addSavedDog = (email, dogObj) => {
  return User.updateOne(
    { email: email },
    { $push: { savedDogs: { $each: [dogObj], $position: 0 } } }
  )
    .then(user => {
      console.info('Dog saved');
    })
    .catch(err => {
      console.info('There was an error adding the dog.');
    });
};

const deleteSavedDog = (email, dogId) => {
  return User.updateOne(
    { email: email },
    { $pull: { savedDogs: { id: dogId } } }
  )
    .then(user => {
      console.info('Dog removed');
    })
    .catch(err => {
      console.info('There was an error removing the dog.');
    });
};

const addDogBreed = (email, breedObj) => {
  return User.updateOne(
    { email: email },
    { $push: { savedBreeds: { $each: [breedObj], $position: 0 } } }
  )
    .then(user => {
      console.info('Breed saved');
    })
    .catch(err => {
      console.info('There was an error adding the breed.');
    });
};

const deleteDogBreed = (email, breedId) => {
  return User.updateOne(
    { email: email },
    { $pull: { savedBreeds: { id: breedId } } }
  )
    .then(user => {
      console.info('Breed removed');
    })
    .catch(err => {
      console.info('There was an error removing the breed.');
    });
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  addSavedDog,
  deleteSavedDog,
  addDogBreed,
  deleteDogBreed
};
