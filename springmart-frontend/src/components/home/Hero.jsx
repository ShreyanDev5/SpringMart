// src/components/home/Hero.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag, FiStar, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import styles from "../../styles/components/home/Hero.module.scss";

const Hero = ({ onSearch }) => {
  // Handle parallax effect for floating elements
  useEffect(() => {
    // Disable parallax for small screens to improve mobile performance
    if (window.innerWidth <= 768) {
      return;
    }

    const handleMouseMove = (e) => {
      const icons = document.querySelectorAll(`.${styles.floatingIcon}`);
      const shapes = document.querySelectorAll(`.${styles.shape}`);
      const card = document.querySelector(`.${styles.heroCard}`);
      
      // Calculate mouse position relative to the center of the screen
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
      
      // Apply subtle parallax to floating icons
      icons.forEach(icon => {
        const depth = parseFloat(icon.getAttribute('data-depth') || 0.5);
        icon.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
      });
      
      // Apply subtle parallax to shapes
      shapes.forEach(shape => {
        const depth = parseFloat(shape.getAttribute('data-depth') || 0.2);
        shape.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
      });
      
      // Apply subtle rotation to card only if not being hovered
      if (card && !card.matches(':hover')) {
        const rotation = -2 + mouseX * 0.05;  // Start from -2deg (initial tilt)
        const translation = mouseY * 0.1;
        card.style.transform = `rotate(${rotation}deg) translateY(${translation}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>Premium Shopping Experience</div>
        <h1 className={`${styles.heroTitle} ${styles.fadeIn}`}>
          Welcome to <span className={`${styles.highlight} ${styles.underlined}`}>SpringMart</span>
        </h1>
        <p className={`${styles.heroSubtitle} ${styles.fadeIn}`} style={{animationDelay: '0.2s'}}>
          Discover amazing products at unbeatable prices with our curated collection
        </p>
        <div className={`${styles.ctaButtons} ${styles.fadeIn}`} style={{animationDelay: '0.4s'}}>
          <Link to="/products" className={`btn btn-primary ${styles.ctaButton}`}>
            Shop Now <FiShoppingCart className="btn-icon" />
          </Link>
          <Link to="/add" className={`btn btn-outline ${styles.ctaButton}`}>
            Sell with Us
          </Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.heroCard}>
          <div className={styles.heroCardBadge}>Featured</div>
          <div className={styles.heroCardContent}>
            <h3>Premium Collection</h3>
            <p>Exclusive products for you</p>
            <Link to="/products" className={styles.heroCardLink}>
              Explore <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className={styles.floatingIcons}>
          <div 
            className={`${styles.floatingIcon} ${styles.icon1}`}
            data-depth="0.6"
            aria-label="Shopping Bag"
          >
            <FiShoppingBag />
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon2}`}
            data-depth="0.4"
            aria-label="Price Tag"
          >
            <FiTag />
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon3}`}
            data-depth="0.8"
            aria-label="Star Rating"
          >
            <FiStar />
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon4}`}
            data-depth="0.5"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart />
          </div>
        </div>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`} data-depth="0.2"></div>
          <div className={`${styles.shape} ${styles.shape2}`} data-depth="0.3"></div>
          <div className={`${styles.shape} ${styles.shape3}`} data-depth="0.1"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
