const { User } = require ('./index.js');
const { iptv } = require ('../config.js');
const axios = require('axios');

const addUser = ({
  name: name,
  street_address: street_address,
  city: city,
  state: state,
  zip: zip,
  email: email,
  password: password
  }) => {
    let latitudeStr = '';
    let longitudeStr = '';
    const pieces = street_address.split(' ');
    const specialJoin = pieces.join('%');
    axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${specialJoin}%${city}%${state}%${zip}&apiKey=${iptv}`)
    .then(({ data }) => {
      const latitudeInt = data.locations[0].referencePosition.latitude;
      latitudeStr = latitudeInt.toString();
      const longitudeInt = data.locations[0].referencePosition.longitude;
      longitudeStr = longitudeInt.toString();
      User.create({
        name: name,
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        lat: latitudeStr,
        lng: longitudeStr,
        email: email,
        password: password
    });
  })
    .catch(err => {
      console.info('There was an error adding a user.');
    })
  }

const getUser = ({name: name}) => {
  let targetUser = User.findOne({ name: name }, (err, user) => {
    if (err) {
      console.error(err);
    } else {
      return user;
    }
  })
}

const updateUser = (name, updateObj) => {
  let latitudeStr = '';
  let longitudeStr = '';
  const pieces = updateObj.street_address.split(' ');
  const specialJoin = pieces.join('%');
  axios.get(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${specialJoin}%${updateObj.city}%${updateObj.state}%${updateObj.zip}&apiKey=${iptv}`)
  .then(({ data }) => {
    console.log(data.locations);
    const latitudeInt = data.locations[0].referencePosition.latitude;
    latitudeStr = latitudeInt.toString();
    const longitudeInt = data.locations[0].referencePosition.longitude;
    longitudeStr = longitudeInt.toString();
    let update = {
      street_address: updateObj.street_address,
      city: updateObj.city,
      state: updateObj.state,
      zip: updateObj.zip,
      lat: latitudeStr,
      lng: longitudeStr,
      email: updateObj.email,
      password: updateObj.password
    }
    User.findOneAndUpdate({'name': name}, update)
    .then(result => {
      console.log('User updated.');
    })
  })
  .catch(err => {
    console.info('There was an error updating the user.');
  })
}

