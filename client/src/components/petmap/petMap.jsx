import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { googleAPI } from "../../../../config.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const googleMap = () => {
  // === Context
  const { userData, organizationsBasedOnDistance, groomersBasedOnDistance } =
    useAuth();
  const [userDataState, setUserDataState] = userData;
  const [
    organizationsBasedOnDistanceState,
    setOrganizationsBasedOnDistanceState,
  ] = organizationsBasedOnDistance;

  const [groomersBasedOnDistanceState, setGroomersBasedOnDistanceState] =
    groomersBasedOnDistance;

  // === State
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [selectedGroomer, setSelectedGroomer] = useState(null);

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
              onClick={() => {
                setSelectedOrganization(organization);
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
              onClick={() => {
                setSelectedGroomer(groomer);
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
      {selectedGroomer && (
        <InfoWindow
          position={{
            lat: selectedGroomer.geometry.location.lat,
            lng: selectedGroomer.geometry.location.lng,
          }}
          onCloseClick={() => {
            setSelectedGroomer(null);
          }}
        >
          <div>
            <h3>{selectedGroomer.name}</h3>
            <h5>{selectedGroomer.formatted_address}</h5>
          </div>
        </InfoWindow>
      )}

      {selectedOrganization && (
        <InfoWindow
          position={{
            lat: selectedOrganization.latitude,
            lng: selectedOrganization.longitude,
          }}
          onCloseClick={() => {
            setSelectedOrganization(null);
          }}
        >
          <div>
            <h3>{selectedOrganization.name}</h3>
            <h4>
              {selectedOrganization.address.city +
                ", " +
                selectedOrganization.address.state +
                " " +
                selectedOrganization.address.postcode}
            </h4>
            <h5>Distance: {selectedOrganization.distance}</h5>
            <h5>Email: {selectedOrganization.email}</h5>
            <h5>Phone: {selectedOrganization.phone}</h5>
            <h5>Url: {selectedOrganization.url}</h5>
          </div>
        </InfoWindow>
      )}
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
