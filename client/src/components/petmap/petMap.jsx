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

/* HR Austin TX
Lat: 30.265020
Lng: -97.750153
*/

const googleMap = () => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 30.26502, lng: -97.750153 }}
    >
      <Marker
        position={{ lat: 30.26502, lng: -97.750153 }}
        // icon={{
        //   url: "/paw_print.png",

        //   scaledSize: new window.google.maps.Size(25, 30)
        // }}
      />
      {dogOrgsLatLng.map((organization, key) => {
        return (
          <Marker
            key={key}
            position={{ lat: organization[0], lng: organization[1] }}
            icon={{
              url: "/paw_print.png",

              scaledSize: new window.google.maps.Size(25, 30),
            }}
          />
        );
      })}
      {petGroomersLatLng.map((groomers, key) => {
        return (
          <Marker
            key={key}
            position={{ lat: groomers[0], lng: groomers[1] }}
            icon={{
              url: "/groomers.png",

              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        );
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
