import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from 'react-responsive';

const ClosetCarousel = ({closetData, searchedClosetData}) => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    // Set carouselData to searchedClosetData when available, otherwise to closetData
    setCarouselData(searchedClosetData.length > 0 ? searchedClosetData : closetData);
  }, []);


  // useEffect(() => {
  //   // If searchedClosetData has data, set carouselData to searchedClosetData
  //   if (searchedClosetData.length > 0) {
  //     setCarouselData(searchedClosetData)
  //   }
  // }, [carouselData]);
  // const items = closetData.map((item) => ({
  //   id: item.id,
  //   title: item.item,
  //   photos: item.photos, // Store the filenames of photos in an array
  // }));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  // Use useMediaQuery to get the device type
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)"
  });

  return (
    <>
    {carouselData.length > 0 ? (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1800}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={800}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={isDesktopOrLaptop ? "desktop" : "mobile"}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
    {carouselData.map((item) => (
            <div key={item.id}>
              <h4>{item.item}</h4>
              {item.photos.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:3001/server/photosUploaded/${photo}`}
                  alt={`Photo ${index + 1}`}
                  className="carousel-image"
                />
              ))}
            </div>
          ))}
    </Carousel>
    ) : (
      <div></div>
    )}
  </>
  )
};

export default ClosetCarousel;