import React from 'react';
import DogCard from '../card/dogCard.jsx';


const FavoriteBreeds = () => {
  return (
    <div>
      {/* map the dataset of dogs */}
      <ul>
        <DogCard orientation='portrait' />
      </ul>
    </div>
  )
}

export default FavoriteBreeds;