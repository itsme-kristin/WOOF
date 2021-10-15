const mongoose = require ('mongoose');
const config = require ('./config.js');

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

  const User = mongoose.model('User', userSchema);

  User.create({
    name: 'Cinderella',
    email: 'ilostmyshoe.com',
    password: 'loveshoes',
    savedDogs: {'Fido': 'Fido'}
  })