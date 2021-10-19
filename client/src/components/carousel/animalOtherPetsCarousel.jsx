import React from 'react';
import Carousel from 'react-grid-carousel';
import DogCard from '../card/dogCard.jsx';

const AnimalOtherPetsCarousel = (props) => {
  const { orgId , numItems } = props;

  const pets = [1,2,3,4,5,6];

  //get organization pets endpoint

  return (
    <Carousel cols={numItems} rows={1} gap={2} showDots>
      {pets.map((elem, i) => (
        <Carousel.Item key={i}>
          <div style={{ padding: 8 }}>
            <DogCard otherPets={true} />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default AnimalOtherPetsCarousel;