const { Breed } = require("./index.js");
const { Description } = require("./index.js");

const getDogBreedByValue = async ({
  breed_name,
  breed_group,
  size,
  temperament,
}) => {
  return Breed.find()
    .and([
      { breed_name: breed_name },
      { breed_group: breed_group },
      { size: size },
      { temperament: { $regex: temperament, $options: "i" } },
    ])
    .then((fileterdDogBreeds) => {
      return fileterdDogBreeds;
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
