import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import OrganizationCard from "./card/organizationCard.jsx";
import EmptyStar from "@mui/icons-material/StarBorder";
import FullStar from "@mui/icons-material/Star";
import PetMap from "./petmap/petMap.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const BreedPage = (props) => {
  const { currentUser, signout, userData, breedOverview } = useAuth();
<<<<<<< HEAD
  const [ userDataState, setUserDataState ] = userData;
  const [ breedOverviewState, setbreedOverviewState ] = breedOverview;
  const [ activeIcon, setActiveIcon ] = useState(false);
  const [ organizations, setOrganizations ] = useState([]);
  const [ description, setDescription ] = useState([]);

  useEffect(()=> {
    axios.get(`/breed-name?name=${breedOverviewState.name}`)
    .then((response) => {
      setDescription(response.data[1][0].description);
    })
    .catch((err)=> {
      console.log('error in retrieving breed description');
    })
  }, []);

  useEffect(()=> {
    axios.get('/adopt', { params: { "breed": breedOverviewState.name , "limit": 3 }})
    .then((response) => {
      setOrganizations(response.data);
    })
    .catch((err)=> {
      console.log('error in retrieving organizations');
    })
  }, []);

  const temperament = breedOverviewState.temperament.split(", ");

  const handleClick = (event) => {
    setActiveIcon(!activeIcon);
  };
  const getIcon = () => {
    let icon = <div />;
    if (activeIcon) {
      icon = (
        <FullStar
          sx={{
            color: "error.light",
            padding: "4px",
            backgroundColor: "#ffffff70",
            borderRadius: "100%",
            width: "18px",
            height: "18px",
          }}
        />
      );
    } else {
      icon = (
        <EmptyStar
          sx={{
            color: "error.light",
            padding: "4px",
            backgroundColor: "#ffffff70",
            borderRadius: "100%",
            width: "18px",
            height: "18px",
          }}
        />
      );
    }
    return icon;
  };

  const handleIconClick = (event) => {
    if (activeIcon) {
      setActiveIcon(false);
      axios
        .put("/deleteBreed", {
          email: userDataState.email,
          id: breedOverviewState.id,
        })
        .then((response) => {
          console.info("Breed deleted");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setActiveIcon(true);
      axios
        .put("/saveBreed", {
          email: userDataState.email,
          breedObj: breedOverviewState,
        })
        .then((response) => {
          console.info("Breed saved!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Box sx={{ marginTop: "10px", padding: 25 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardMedia
              image={breedOverviewState.image.url}
              alt="Oliver the dog"
              sx={{
                width: "100%",
                height: "350px",
                backgroundColor: "linen",
              }}
            >
              <Grid item container justifyContent="flex-end">
                <CardActions
                  onClick={handleIconClick}
                  sx={{
                    padding: "5px",
                    zIndex: 1,
                  }}
                >
                  {getIcon()}
                </CardActions>
              </Grid>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item container xs={5}>
          <Grid item xs={12}>
            <Typography variant="h3">{breedOverviewState.name}</Typography>
            <Typography variant="h5">
              Breed origin: {breedOverviewState.origin}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"> {description} </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="ul">
              <li>Height: {breedOverviewState.height.imperial} lbs</li>
              <li>Weight: {breedOverviewState.weight} </li>
              <li>Life Span: {breedOverviewState.life_span} </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" component="ul">
              <li>Breed Group: {breedOverviewState.breed_group} </li>
              <li>Bred For: {breedOverviewState.bred_for} </li>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ height: "100%", backgroundColor: "#C6AC8F" }}>
            <Typography variant="h5"> Breed Temperament </Typography>
            <Typography variant="body2" component="ul">
              {temperament.map((elem, i) => {
                return <li key={i}>{elem}</li>;
              })}
            </Typography>
          </Card>
        </Grid>
        <Grid item container spacing={1} xs={8} sx={{ height: "100%" }}>
          {/* map over the organizations array and populate this section with organizationCards */}
          {organizations.map((elem, i) => {
            return (
              <Grid item key={i}>
                <OrganizationCard organization={elem} />
              </Grid>
            );
          })}
        </Grid>
        <Grid height="315" width="315" item xs={4} sx={{ height: "100%" }}>
          <Box
            id="googleMap"
            sx={{
              width: 315,
              height: 315,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <PetMap />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BreedPage;
