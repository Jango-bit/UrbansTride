import React, { useState } from 'react';
import classes from './Brands.module.scss'; // Import SCSS file

function Brands() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const images = [
    "https://www.designyourway.net/blog/wp-content/uploads/2010/11/Nike-Print-Ads-6.jpg",
    "https://i.ytimg.com/vi/nMU08stMQ2Y/maxresdefault.jpg",
    "https://www.xibaaru.sn/wp-content/uploads/2020/08/neymar-nike.jpg"
  ];


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div>
      <div className={classes.ttrendingSection}> {/* Class names used as defined in SCSS */}
        <h3>Our Brand Styling</h3>
        <div className={classes.piimageContainer}>
          {/* Display only the current image */}
          <img
            className={classes.mmainImage}
            src={images[currentImageIndex]}
            alt="Main Shoe"
          />
        </div>
        {/* Navigation buttons */}
        <div className={classes.navigationButtons}>
          <button onClick={prevImage}>Previous</button>
          <button onClick={nextImage}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Brands;
