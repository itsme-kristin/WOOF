const mongoose = require ('mongoose');
const config = require ('./config.js');
const axios = require ('axios');

mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('Database connected.');
  }
  ).catch((err) => {
    console.log('Not connected');
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    savedDogs: Object,
  })

  const breedSchema = new mongoose.Schema({
    bred_for: String,
    breed_group: String,
    country_code: {
      type: String,
      default: ''
    },
    height: {
      imperial: String,
      metric: String
    },
    id: Number,
    image: {
      height: Number,
      id: String,
      url: String,
      width: Number,
    },
    life_span: String,
    name: String,
    origin: String,
    reference_image_id: String,
    temperament: String,
    weight: {
      imperial: String,
      metric: String
    }

  })

  const User = mongoose.model('User', userSchema);

  const Breed = mongoose.model('Breed', breedSchema);

