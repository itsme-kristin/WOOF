import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { googleAPI } from "../../../../config.js";
import {
  dogOrganizatonsObj,
  dogOrgsLatLng,
  petGroomersLatLng,
} from "./dummyData.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

const googleMap = () => {
  const { userData, organizationsBasedOnDistance } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [
    organizationsBasedOnDistanceState,
    setOrganizationsBasedOnDistanceState,
  ] = organizationsBasedOnDistance;

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{
        lat: Number(userDataState.lat),
        lng: Number(userDataState.lng),
      }}
    >
      <Marker
        position={{
          lat: Number(userDataState.lat),
          lng: Number(userDataState.lng),
        }}
      />
      {organizationsBasedOnDistanceState.map((organization, key) => {
        console.log(
          "inner log",
          typeof organization.latitude,
          organization.longitude
        );
        if (organization.latitude) {
          return (
            <Marker
              key={key}
              position={{
                lat: organization.latitude,
                lng: organization.longitude,
              }}
              icon={{
                url: "/paw_print.png",
                scaledSize: new window.google.maps.Size(25, 30),
              }}
            />
          );
        } else {
          return "";
        }
      })}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(googleMap));

const PetMap = () => {
  const { userData, organizationsBasedOnDistance } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [
    organizationsBasedOnDistanceState,
    setOrganizationsBasedOnDistanceState,
  ] = organizationsBasedOnDistance;

  if (organizationsBasedOnDistanceState.length > 0) {
    return (
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleAPI}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `197px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  } else {
    return <h3>Sign In To Use Our GoogleMaps features</h3>;
  }
};

export default PetMap;
