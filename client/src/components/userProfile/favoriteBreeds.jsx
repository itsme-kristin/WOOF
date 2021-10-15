import React from 'react';
import DogCard from '../card/dogCard.jsx';


const FavoriteDogs = () => {
  return (
    <div>
      {/* map the dataset of dogs */}
      <DogCard orientation='portrait' />
    </div>
  )
}

export default FavoriteDogs;