import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../styles/carouselStyles.css';

const backendUrl = 'http://localhost:8000';
// md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden

const CarouselPhotos = ({ photos }) => {
  return (
    <>
      <div className="h-[44rem] w-3/4 mx-auto -mb-4">
        <Carousel
          showArrows={true}
          showIndicators={false}
          useKeyboardArrows={true}
        >
          {photos.map((photo, index) => (
            <div key={index} className="h-full w-full">
              <img
                src={`${backendUrl}${photo.image}`}
                alt={`Slide ${index}`}
                className="h-full object-cover object-center"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselPhotos;
