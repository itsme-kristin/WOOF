const axios = require('axios');
const { petfinderConfig } = require('../../config');

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
    });
};

module.exports = {
  getAuthToken,
  tokenInfo
};
