const axios = require('axios');
const { petfinderConfig } = require('../config');

const tokenInfo = {
  token: '',
  tokenType: '',
  expiration: null
};

const getAuthToken = () => {
  return axios
    .post('https://api.petfinder.com/v2/oauth2/token', petfinderConfig)
    .then(({ data }) => {
      tokenInfo.token = data.access_token;
      tokenInfo.tokenType = data.token_type;
      tokenInfo.expiration = new Date().getTime() + data.expires_in * 1000;
    })
    .catch(err => {
      console.log('Error getting new token');
    });
};

const getDogs = () => {
  if (
    !tokenInfo.expiration ||
    tokenInfo.expiration - new Date().getTime() < 1
  ) {
    return getAuthToken().then(() => {
      return axios.get('https://api.petfinder.com/v2/animals?type=dog', {
        headers: {
          Authorization: `${tokenInfo.tokenType} ${tokenInfo.token}`
        }
      });
    });
  } else {
    return axios.get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        Authorization: `${tokenInfo.tokenType} ${tokenInfo.token}`
      }
    });
  }
};

module.exports = {
  getAuthToken,
  getDogs
};
