const { db, User } = require ('./index.js');
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
      console.info('There was an error getting coordinates');
    })
  }




