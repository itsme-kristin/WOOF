const { Breed } = require("./index.js");
const { Description } = require("./index.js");

const getDogBreedByValue = (property, value) => {
  const queryObj = { property: value };
  Breed.find(queryObj, (errorFilteringDogs, filteredDogBreed) => {
    if (errorFilteringDogs) {
      return errorFilteringDogs;
    } else {
      return filteredDogBreed;
    }
  });
};

const getDogBreedInformationByName = (dogBreedName) => {
  let dogBreedToLowerCase = dogBreedName.toLowerCase();
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

const sortDogBreedBySize = (size) => {
  Breed.find({}, (err, result) => {
    //breedName
    if (err) {
      console.log("err");
    } else {
      result.forEach((dog) => {
        const dogWeightRangeInString = dog.weight.imperial.split("-");
        const dogWeightRangeToNums = dogWeightRangeInString.map((stringNum) => {
          return parseInt(stringNum);
        });
        const avgWeight =
          (dogWeightRangeToNums[0] + dogWeightRangeToNums[1]) / 2;
        let dogSize;
        if (!avgWeight || avgWeight <= 22) {
          dogSize = "small";
        } else if (avgWeight > 23 && avgWeight <= 54) {
          dogSize = "medium";
        } else {
          dogSize = "large";
        }
        // console.log(dog.name, dogSize);

        const filter = { name: dog.name };
        const update = { weight: dogSize };

        Breed.findOneAndUpdate(filter, update, {
          new: true,
        }).then((result) => {
          console.log(result);
        });
      });
    }
  });
};
// sortDogBreedBySize();
