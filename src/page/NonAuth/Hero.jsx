
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Hero.module.scss';
import Footer from '../../common/Layout/Footer/Footer';

const Hero = () => {
  const navigate = useNavigate();

  const handleclicking = () => {
    navigate('/Brands');
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the slideshow
  const images = [
    "https://static.nike.com/a/images/w_1280,c_limit,q_auto,f_auto/375e054c-cbd0-4974-8b43-11c1c019c610/in-game-sneakers.jpg",
    "https://static.nike.com/a/images/w_1280,c_limit,q_auto,f_auto/0eb6bb36-66a5-454d-a5c9-d63d45a9ef73/in-game-sneakers.jpg",
    "https://static.nike.com/a/images/w_1280,c_limit,q_auto,f_auto/8952d923-c33b-4218-9d44-5167102824d2/in-game-sneakers.jpg",]

  // Effect to change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <>
      <div className={classes.heroContainer}>
        <h2 className={classes.line}> TOP OF THE WISHLIST KICKS</h2>
        <p className={classes.description}>
          Stand out in a world of solids. Fresh prints in cozy fleece are made for chilling 
        </p>
        <button className={classes.shopButton} onClick={handleclicking}>SHOP KICKS</button>

        {/* Slideshow Section */}
        <div className={classes.trendingSection}>
          <h3>Trending</h3>
          <div className={classes.imageContainer}>
            {/* Slideshow Image */}
            <div className={classes.slideshow}>
              <img className={classes.mainImage} src={images[currentImageIndex]} alt="Slideshow" />
            </div>
            <div className={classes.imageRight}>
              <img className={classes.trendingImage} src={images[1]} alt="Trending 1" />
              <img className={classes.trendingImage} src={images[2]} alt="Trending 2" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.footer}> <Footer /></div>
    </>
  );
};

export default Hero;
