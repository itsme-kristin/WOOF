const { Breed } = require("./index.js");
const { Description } = require("./index.js");

const getDogBreedByValue = async ({
  breed_group = null,
  size = null,
  temperament = null,
}) => {
  let queryArray = returnQueryObject(breed_group, size, temperament);

  if (queryArray.length === 1) {
    return Breed.find(queryArray[0])
      .then((filteredDogBreedsArr) => {
        return filteredDogBreedsArr;
      })
      .catch((errorFilteringDogs) => {
        return errorFilteringDogs;
      });
  } else {
    return Breed.find()
      .and(queryArray)
      .then((fileterdDogBreeds) => {
        return fileterdDogBreeds;
      })
      .catch((errorFilteringDogs) => {
        return errorFilteringDogs;
      });
  }
};
// ==== Helper Function ====
const returnQueryObject = (breed_group, size, temperament) => {
  let queryArray = [];
  if (breed_group) {
    let groupObj = {
      breed_group: breed_group,
    };
    queryArray.push(groupObj);
  }

  if (size) {
    let sizeObj = {
      weight: size,
    };
    queryArray.push(sizeObj);
  }

  if (temperament) {
    let temperamentObj = {
      temperament: { $regex: temperament, $options: "i" },
    };

    queryArray.push(temperamentObj);
  }

  return queryArray;
};

const getDogBreedInformationByName = (dogBreedName) => {
  let dogBreedToLowerCase = dogBreedName.toLowerCase();
  return Promise.all([
    Breed.find({ name: dogBreedName }),
    Description.find({ breedName: dogBreedToLowerCase }),
  ])
    .then((dogObject) => {
      return dogObject;
    })
    .catch((errorGettingDogInformation) => {
      return errorGettingDogInformation;
    });
};

module.exports = {
  getDogBreedByValue,
  getDogBreedInformationByName,
};
