const axios = require('axios');
const { response } = require('express');
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

const getDogs = filters => {
  // const { location, distance, breed, size, gender, age, coat, good_with_children, good_with_dogs, good_with }
  let queryString = 'type=dog&status=adoptable';
  const filterKeys = Object.keys(filters);
  for (const filter in filters) {
    if (filters[filter]) {
      if (filter === filterKeys[filterKeys.length - 1]) {
        queryString += `&${filter}=${filters[filter]}`;
      } else {
        queryString += `&${filter}=${filters[filter]}`;
      }
    }
  }
  if (
    !tokenInfo.expiration ||
    tokenInfo.expiration - new Date().getTime() < 1
  ) {
    return getAuthToken().then(() => {
      return axios
        .get(`https://api.petfinder.com/v2/animals?${queryString}`, {
          headers: {
            Authorization: `${tokenInfo.tokenType} ${tokenInfo.token}`
          }
        })
        .then(({ data }) => {
          return getDogsWithOrgNames(data.animals);
        });
    });
  } else {
    return axios
      .get(`https://api.petfinder.com/v2/animals?${queryString}`, {
        headers: {
          Authorization: `${tokenInfo.tokenType} ${tokenInfo.token}`
        }
      })
      .then(({ data }) => {
        return getDogsWithOrgNames(data.animals);
      });
  }
};

const getDogsWithOrgNames = async dogs => {
  const result = [];
  for (const dog of dogs) {
    const { data } = await axios.get(
      `https://api.petfinder.com/v2/organizations/${dog.organization_id}`,
      {
        headers: {
          Authorization: `${tokenInfo.tokenType} ${tokenInfo.token}`
        }
      }
    );
    result.push({ ...dog, organization_name: data.organization.name });
  }
  return result;
};

module.exports = {
  getAuthToken,
  getDogs
};
