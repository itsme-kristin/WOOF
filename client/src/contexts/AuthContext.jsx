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
import { iptv } from "../../../config.js";

const AuthContext = createContext();

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
    city: "",
    state: "",
    zip: "",
    savedBreeds: [],
    savedDogs: [],
  });

  const [organizationsBasedOnDistance, setOrganizationsBasedOnDistance] =
    useState([{ latitude: 0, longitude: 0 }]);

  const fetchNearByOrganizations = () => {
    axios
      .get(
        `/nearbyOrgs?lat=${userData.lat}&lng=${userData.lng}&distance=${100}`
      )
      .then((nearbyOrganizations) => {
        nearbyOrganizations.data.forEach((org) => {
          let address = org.address.address1;
          let city = org.address.city;
          let state = org.address.state;
          let postcode = org.address.postcode;

          if (address && address.includes(".")) {
            let removedPeriod = address.split(".").join("");
            address = removedPeriod;
          }
          if (address) {
            let queryAddress = address.split(" ").join("+");
            axios
              .get(
                `https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${queryAddress}+${city}+${state}+${postcode}&apiKey=${iptv}`
              )
              .then((geoCodedCoordinates) => {
                console.log(
                  "geoObj",
                  geoCodedCoordinates.data.locations[0].referencePosition
                    .latitude,
                  geoCodedCoordinates.data.locations[0].referencePosition
                    .longitude
                );
                org.latitude =
                  geoCodedCoordinates.data.locations[0].referencePosition.latitude;
                org.longitude =
                  geoCodedCoordinates.data.locations[0].referencePosition.longitude;
                // console.log(org.latitude, org.longitude);
              })
              .catch((errGetingCoordinates) => {
                console.log(errGetingCoordinates);
              });
          }
        });
        setOrganizationsBasedOnDistance(nearbyOrganizations.data);
        // console.log("after", nearbyOrganizations.data);
      })
      .catch((errorGettingOrganizations) => {
        console.log("err", errorGettingOrganizations);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
