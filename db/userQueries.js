const { User } = require ('./index.js');
const { iptv } = require ('../config.js');
const axios = require('axios');

const getCoordinates = ({ street_address, city, state, zip }) => {
  let latitudeStr = '';
  let longitudeStr = '';
  const pieces = street_address.split(' ');
  const specialJoin = pieces.join('%');
  return axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${specialJoin}%${city}%${state}%${zip}&apiKey=${iptv}`)
    .then(({ data }) => {
      const latitudeInt = data.locations[0].referencePosition.latitude;
      latitudeStr = latitudeInt.toString();
      const longitudeInt = data.locations[0].referencePosition.longitude;
      longitudeStr = longitudeInt.toString();

      return { latitudeStr, longitudeStr }
    })
    .catch(err => console.error('There was an error updating the user.'));
}

const addUser = ({ name, street_address, city, state, zip, email, password }) => {
  getCoordinates({ street_address, city, state, zip })
    .then(({ latitudeStr, longitudeStr }) => {
      User.create({
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        lat: latitudeStr,
        lng: longitudeStr,
        email: email,
        password: password,
        savedDogs: []
      });
    })
    .catch(err => {
      console.info('There was an error adding a user.');
    });
};

const getUser = ({ name }) => {
  let targetUser = User.findOne({ name }, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      return user;
    }
  })
}

const updateUser = (name, { street_address, city, state, zip, email, password }) => {
  getCoordinates({ street_address, city, state, zip })
    .then(({ latitudeStr, longitudeStr }) => {
      let update = {
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        lat: latitudeStr,
        lng: longitudeStr,
        email: email,
        password: password
      }
      User.updateOne({'name': name}, update)
        .then(result => {
          console.info('User updated.');
        })
        .catch(err => console.error('Error updating user.'));
    })
    .catch(err => {
      console.info('There was an error adding a user.');
    });
}

const addSavedDog = (email, id) => {
  return User.updateOne({ email: email }, {'$push': {savedDogs: id}})
    .then(user => {
      console.info('Dog saved');
    })
    .catch(err => {
      console.info('There was an error adding the dog.');
    })
}

const deleteSavedDog = (email, id) => {
  return User.updateOne({ email: email }, {'$pull': { savedDogs: id}})
  .then(user => {
    console.info('Dog removed');
  })
  .catch(err => {
    console.info('There was an error removing the dog.')
  })
}

module.exports = {
  addUser,
  getUser,
  updateUser,
  addSavedDog,
  deleteSavedDog
}