const { Breed } = require("./index.js");
const { Description } = require("./index.js");

const getDogBreedByValue = (property, value) => {
  const queryObj = { property: value };
  return Breed.find(queryObj)
    .then((filteredDogBreed) => {
      return filteredDogBreed;
    })
    .catch((errorFilteringDogs) => {
      return errorFilteringDogs;
    });
};

const getDogBreedInformationByName = (dogBreedName) => {
  let dogBreedToLowerCase = dogBreedName.toLowerCase();
  return Promise.all([
    Breed.find({ name: dogBreedName }),
    Description.find({ breedName: dogBreedToLowerCase }),
  ])
    .then((dogObject) => {
      // console.log(dogObject);
      return dogObjects;
    })
    .catch((errorGettingDogInformation) => {
      return errorGettingDogInformation;
    });
};

module.exports = {
  getDogBreedByValue,
  getDogBreedInformationByName,
};
