import React from 'react';
import Carousel from 'react-grid-carousel';
import DogCard from '../card/dogCard.jsx';

const AnimalOtherPetsCarousel = (props) => {
  const { otherPets , numItems } = props;

  return (
    <Carousel cols={numItems} rows={1} gap={2} showDots>
      {otherPets.map((elem, i) => (
        <Carousel.Item key={i}>
          <div style={{ padding: 8 }}>
            <DogCard
              dogObj={elem}
              image={elem.photos[0]?.medium ? elem.photos[0].medium : undefined}
              text={`${elem.age} ${elem.breeds.primary}`}
              type='heart'
              name={elem.name}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default AnimalOtherPetsCarousel;