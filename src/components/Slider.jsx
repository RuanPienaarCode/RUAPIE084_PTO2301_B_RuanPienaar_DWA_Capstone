import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

/**
 * PodcastCarousel component displays a carousel of podcast images and titles fetched from an API.
 * @component
 * @param {Object} props - The component's props.
 * @returns {JSX.Element} - The rendered PodcastCarousel component.
 */
function PodcastCarousel(props) {
  // State to hold the fetched podcast content
  const [content, setContent] = useState([]);

  /**
   * Fetches podcast data from the API.
   * @async
   * @function
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');

        if (!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();
        setContent(data);

        console.log(data);
      } catch (error) {
        console.error('Error fetching podcast data:', error);
      }
    };

    fetchData();
  }, []);

  // Configuration for responsive carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="carousel-container" style={{ maxWidth: '100%' }}>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={true}
        responsive={responsive}
        infinite={true}
        customTransition="all .5"
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType="desktop"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {/* Render carousel items based on fetched podcast data */}
        {content.map((podcast, index) => (
          <div key={index}>
            <img
              src={podcast.image}
              alt={podcast.title}
              style={{ borderRadius: '5px', width: '100%', height: 'auto' }}
            />
            <p>{podcast.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default PodcastCarousel;
