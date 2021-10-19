import React from 'react';
import Carousel from 'react-grid-carousel';

const AnimalPhotoCarousel = (props) => {
  const { photos, numItems } = props;

  return (
    <Carousel cols={numItems} rows={1} gap={10} showDots loop>
      {photos.map((elem, i) => (
        <Carousel.Item key={i}>
          <div style={{ padding: 8 }}>
            <img src={elem.large}></img>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default AnimalPhotoCarousel;