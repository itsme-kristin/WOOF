import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { googleAPI } from "../../../../config.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const googleMap = () => {
  const { userData, organizationsBasedOnDistance, groomersBasedOnDistance } =
    useAuth();
  const [userDataState, setUserDataState] = userData;
  const [
    organizationsBasedOnDistanceState,
    setOrganizationsBasedOnDistanceState,
  ] = organizationsBasedOnDistance;

  const [groomersBasedOnDistanceState, setGroomersBasedOnDistanceState] =
    groomersBasedOnDistance;

  return (
    <GoogleMap
      defaultZoom={11.5}
      defaultCenter={{
        lat: userDataState.lat,
        lng: userDataState.lng,
      }}
    >
      <Marker
        position={{
          lat: userDataState.lat,
          lng: userDataState.lng,
        }}
      />
      {organizationsBasedOnDistanceState.map((organization, key) => {
        if (organization.latitude > 0) {
          return (
            <Marker
              key={key}
              position={{
                lat: organization.latitude,
                lng: organization.longitude,
              }}
              icon={{
                url: "/paw_print.png",
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          );
        } else {
          return "";
        }
      })}
      {groomersBasedOnDistanceState.map((groomer, key) => {
        if (groomer.geometry.location.lat > 0) {
          return (
            <Marker
              key={key}
              position={{
                lat: groomer.geometry.location.lat,
                lng: groomer.geometry.location.lng,
              }}
              icon={{
                url: "/groomers.png",
                scaledSize: new window.google.maps.Size(35, 35),
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
  return (
    <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleAPI}`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `197px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};

export default PetMap;
