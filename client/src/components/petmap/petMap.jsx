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

import {
  Grid,
  Typography,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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

  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [selectedGroomer, setSelectedGroomer] = useState(null);

  const infoDisplay = (info) => {

    const style = {
      list: {
        paddingLeft: '5px',
        listStyleType: 'none',
      },
    }

    const results = {}
    const { email, phone, address, hours, url } = info

    if (address) {
      const { address1, address2, city, state, postcode, country } = address

      results.address = (
        <Typography variant="caption" component="ul" sx={style.list} gutterBottom>
          {!address1 ? '' : (<li>{address1}</li>)}
          {!address2 ? '' : (<li>{address2}</li>)}
          <li>
            {!city ? '' : city + ', '}
            {!state ? '' : state + ' '}
            {!postcode ? '' : postcode}
          </li>
        </Typography>
      );
    }

    !email ? null : results.email = (<li>Email: {email}</li>)
    !phone ? null : results.phone = (<li>Phone: {phone}</li>)

    results.contact = (
      <Typography variant="caption" component="ul" sx={style.list}>
        {results.email}
        {results.phone}
      </Typography>
    );

    return [results.address, results.contact];
  }

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
          <Grid container spacing={1}>
            <Grid item>
              <AutoAwesomeIcon sx={{ color: '#22333B', fontSize: '24px'}}/>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                    {selectedGroomer.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption" component="ul" sx={{ paddingLeft: '5px', listStyleType: 'none' }}>
                    <li>{selectedGroomer.formatted_address}</li>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
          <Grid container spacing={1}>
            <Grid item>
              <PetsIcon sx={{ color: '#22333B', fontSize: '24px'}}/>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                    {selectedOrganization.name}
                  </Typography>
                </Grid>
                <Grid item>
                  {infoDisplay(selectedOrganization)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
