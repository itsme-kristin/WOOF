import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import { googleAPI } from "../../../../config.js";

const googleMap = () => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 30.542747, lng: -97.550011 }}
    >
      <Marker position={{ lat: 30.542747, lng: -97.550011 }} />
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
