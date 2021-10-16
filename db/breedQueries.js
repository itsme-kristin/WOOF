// import { Breed } from "./index.js";
const { Breed } = require("./index.js");
const { Description } = require("./index.js");

const getDogBreedByValue = (property, value) => {
  const queryObj = { property: value };
  Breed.find(queryObj, (errorFilteringDogs, filteredDogBreed) => {
    if (errorFilteringDogs) {
      return errorFilteringDogs;
    } else {
      console.log(filteredDogBreed);
      return filteredDogBreed;
    }
  });
};

// getDogBreedByValue("breed_group", "Toy");
// getDogBreedByValue("bred_for", "Companion");

const getDogInformationByName = (breedName) => {
  let dogBreedToLowerCase = breedName.toLowerCase();
  Promise.all([
    Breed.find({ name: breedName }),
    Description.find({ breedName: dogBreedToLowerCase }),
  ])
    .then((dogObject) => {
      const dogBreedInformationObject = dogObject[0][0];
      dogBreedInformationObject.description = dogObject[1][0].description;
      return dogBreedInformationObject;
    })
    .catch((errorGettingDogInformation) => {
      return errorGettingDogInformation;
    });
};

// getDogInformationByName("Irish Terrier");
