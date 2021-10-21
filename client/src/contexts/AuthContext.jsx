import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.jsx';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};




const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    savedBreeds: [],
    savedDogs: [],
  });

  const [dogOverview, setDogOverview] = useState({
    id: 53317583,
    organization_id: 'MT59',
    url: 'https://www.petfinder.com/dog/josie-jj-covington-la-53317583/mt/roundup/janeens-catahoula-leopard-dog-rescue-inc-mt59/?referrer_id=e7aeebdb-543c-448c-973a-89723cb8f73b',
    type: 'Dog',
    species: 'Dog',
    breeds: {
      primary: 'Catahoula Leopard Dog',
      secondary: null,
      mixed: false,
      unknown: false
    },
    colors: {
      primary: 'Golden',
      secondary: 'White / Cream',
      tertiary: null
    },
    age: 'Young',
    gender: 'Female',
    size: 'Large',
    coat: null,
    attributes: {
      spayed_neutered: true,
      house_trained: false,
      declawed: null,
      special_needs: false,
      shots_current: true
    },
    environment: {
      children: true,
      dogs: true,
      cats: null
    },
    tags: ['Friendly', 'Affectionate', 'Loyal', 'Playful', 'Smart', 'Funny'],
    name: 'JOSIE-JJ (COVINGTON, LA)',
    description:
      'If  this pretty pup tugs on your heart please go to our website www.jcldr.com and fill out an online application....',
    organization_animal_id: 'KL CLA',
    photos: [
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365'
      },
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366'
      },
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367'
      }
    ],
    primary_photo_cropped: {
      small:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=300',
      medium:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=450',
      large:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=600',
      full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365'
    },
    videos: [],
    status: 'adoptable',
    status_changed_at: '2021-10-20T08:42:48+0000',
    published_at: '2021-10-20T08:42:48+0000',
    distance: null,
    contact: {
      email: 'jj4@midrivers.com',
      phone: '406 323 3519',
      address: {
        address1: null,
        address2: null,
        city: 'Roundup',
        state: 'MT',
        postcode: '59072',
        country: 'US'
      }
    },
    _links: {
      self: {
        href: '/v2/animals/53317583'
      },
      type: {
        href: '/v2/types/dog'
      },
      organization: {
        href: '/v2/organizations/mt59'
      }
    },
    organization_name: "Janeen's Catahoula Leopard Dog Rescue Inc"
  });

  const [breedOverview, setBreedOverview] = useState([
    [
        {
            "height": {
                "imperial": "9 - 11.5",
                "metric": "23 - 29"
            },
            "image": {
                "height": 1199,
                "id": "BJa4kxc4X",
                "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
                "width": 1600
            },
            "weight": "small",
            "_id": "6169acbe99bd0491f8a6c7a4",
            "bred_for": "Small rodent hunting, lapdog",
            "breed_group": "Toy",
            "country_code": "",
            "id": 1,
            "life_span": "10 - 12 years",
            "name": "Affenpinscher",
            "origin": "Germany, France",
            "reference_image_id": "BJa4kxc4X",
            "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            "__v": 0
        }
    ],
    [
        {
            "_id": "616af8ffac0f80f68ad2c499",
            "breedName": "affenpinscher",
            "description": "Canines in the Affenpinscher dog breed were originally created to be ratters in homes, stables, and shops. Bred down in size, they moved up in the world, becoming ladies’ companions. Today, they are happy, mischievous companion dogs.",
            "__v": 0
        }
    ]
]);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };


  useEffect(() => {
    const data = (window.localStorage.getItem('userData'))
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData])



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signout,
    signin,
    userData: [userData, setUserData],
    dogOverview: [dogOverview, setDogOverview],
    breedOverview: [breedOverview, setBreedOverview],
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;