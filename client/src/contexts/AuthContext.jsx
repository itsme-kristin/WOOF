import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase.jsx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { iptv, googleAPI } from "../../../config.js";
import Geocode from "react-geocode";
const AuthContext = createContext();
Geocode.setApiKey(googleAPI);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    street_address: "",
    lat: 30.2672,
    lng: 97.7431,
    city: "",
    state: "",
    zip: "",
    savedBreeds: [],
    savedDogs: [],
  });

  const [organizationsBasedOnDistance, setOrganizationsBasedOnDistance] =
    useState([{ latitude: 30.2672, longitude: 97.7431 }]);

  const [groomersBasedOnDistance, setGroomersBasedOnDistance] = useState([
    { geometry: { location: { lat: 30.2672, lng: 97.7431 } } },
  ]);

  const convertAddressToLatLng = (strAddress) => {
    return Geocode.fromAddress(strAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        let latLngArray = [lat, lng];

        return latLngArray;
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const fetchNearByOrganizations = () => {
    if (userData.lat) {
      axios
        .get(
          `/nearbyOrgs?lat=${userData.lat}&lng=${userData.lng}&distance=${10}`
        )
        .then((nearbyOrganizations) => {
          nearbyOrganizations.data.forEach((org) => {
            let address = org.address.address1;
            let city = org.address.city;
            let state = org.address.state;
            let postcode = org.address.postcode;
            let latLngQueryString = address + city + state + postcode;

            Geocode.fromAddress(latLngQueryString).then(
              (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                org.latitude = lat;
                org.longitude = lng;
              },
              (error) => {
                console.error(error);
              }
            );
          });
          setOrganizationsBasedOnDistance(nearbyOrganizations.data);
        })
        .catch((errorGettingOrganizations) => {
          console.log("err", errorGettingOrganizations);
        });
    }
  };

  const fetchNearByGroomers = () => {
    let distance = 10;
    axios
      .get(
        `/groomers?distance=${distance}&location=${userData.lat},${userData.lng}`
      )
      .then((nearbyGroomers) => {
        setGroomersBasedOnDistance(nearbyGroomers.data);
      })
      .catch((errorGettingNearbyGroomers) => {
        console.log(errorGettingNearbyGroomers);
      });
  };

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
    const data = window.localStorage.getItem("userData");

    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("userData", JSON.stringify(userData));
    if (userData.lat) {
      fetchNearByOrganizations();
      fetchNearByGroomers();
    }
  }, [userData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    organizationsBasedOnDistance: [
      organizationsBasedOnDistance,
      setOrganizationsBasedOnDistance,
    ],
    convertAddressToLatLng,
    groomersBasedOnDistance: [
      groomersBasedOnDistance,
      setGroomersBasedOnDistance,
    ],
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
