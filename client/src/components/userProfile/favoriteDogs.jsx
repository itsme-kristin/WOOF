import React from 'react';
import DogCard from '../card/dogCard.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Carousel from 'react-grid-carousel';



const FavoriteBreeds = () => {
  const { userData } = useAuth();
  const [userDataState, setUserDataState] = userData;


  return (
    <Carousel cols={4} rows={1} loop>
      {userDataState.savedDogs.map((dog, index) => {
        if (dog) {
          return (
            <Carousel.Item key={index}>
              <DogCard
                orientation='portrait'
                dogObj={dog}
                image={dog.photos[0]?.medium ? dog.photos[0].medium : undefined}
                name={dog.name}
                text={`${dog.age} ${dog.breeds.primary}`}
                type='heart'
                />
            </Carousel.Item>
          )
        }
      })}
    </Carousel>
  )
}

export default FavoriteBreeds;