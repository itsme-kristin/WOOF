import React from 'react';
import DogCard from '../card/dogCard.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Carousel from 'react-grid-carousel';

const FavoriteDogs = () => {
  const { userData } = useAuth()
  const [userDataState, setUserDataState] = userData;

  return (
    <Carousel cols={3} rows={1} loop>
      {userDataState.savedBreeds.map((breed, index) => {
        if (breed) {
          console.log(breed);
          return (
            <Carousel.Item key={index}>
              <DogCard
                orientation='landscape'
                type='star'
                breedObj={breed}
                image={breed.image.url}
                name={breed.name}
                />
            </Carousel.Item>
          )
        }
      })}
    </Carousel>
  )
}

export default FavoriteDogs;