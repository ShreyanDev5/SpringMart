// src/components/home/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag, FiStar, FiArrowRight, FiShoppingCart, FiInfo } from "react-icons/fi";
import styles from "../../styles/components/home/Hero.module.scss";

const Hero = ({ onSearch }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  
  // Handle parallax effect for floating elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const icons = document.querySelectorAll(`.${styles.floatingIcon}`);
      const shapes = document.querySelectorAll(`.${styles.shape}`);
      const card = document.querySelector(`.${styles.heroCard}`);
      const badge = document.querySelector(`.${styles.floatingBadge}`);
      
      // Calculate mouse position relative to the center of the screen
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20; // Reduced movement amount
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 10; // Reduced movement amount
      
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
      
      // Apply subtle rotation to card
      if (card) {
        card.style.transform = `rotate(${-3 + mouseX * 0.05}deg) translateY(${mouseY * 0.1}px)`;
      }
      
      // Apply subtle movement to badge
      if (badge) {
        badge.style.transform = `translate(${mouseX * 0.2}px, ${mouseY * 0.2}px)`;
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
        {/* Removed search bar as it's now in the navbar */}
        <div className={`${styles.ctaButtons} ${styles.fadeIn}`} style={{animationDelay: '0.4s'}}>
          <Link to="/products" className={`btn btn-primary ${styles.ctaButton}`}>
            Shop Now <FiShoppingCart className="btn-icon" />
          </Link>
          <Link to="/add-product" className={`btn btn-outline ${styles.ctaButton}`}>
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
        <div 
          className={styles.floatingBadge} 
          onMouseEnter={() => setShowTooltip(true)} 
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Top Deals Today"
        >
          🛍️ Top Deals Today
          <FiInfo className={styles.infoIcon} />
          {showTooltip && (
            <div className={styles.tooltip}>Limited time offers with up to 50% off!</div>
          )}
        </div>
        <div className={styles.floatingIcons}>
          <div 
            className={`${styles.floatingIcon} ${styles.icon1} ${activeIcon === 'bag' ? styles.active : ''}`}
            onClick={() => setActiveIcon(activeIcon === 'bag' ? null : 'bag')}
            data-depth="0.6"
            aria-label="Shopping Bag"
          >
            <FiShoppingBag />
            {activeIcon === 'bag' && (
              <div className={styles.iconTooltip}>Bag your favorites</div>
            )}
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon2} ${activeIcon === 'tag' ? styles.active : ''}`}
            onClick={() => setActiveIcon(activeIcon === 'tag' ? null : 'tag')}
            data-depth="0.4"
            aria-label="Price Tag"
          >
            <FiTag />
            {activeIcon === 'tag' && (
              <div className={styles.iconTooltip}>Best prices</div>
            )}
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon3} ${activeIcon === 'star' ? styles.active : ''}`}
            onClick={() => setActiveIcon(activeIcon === 'star' ? null : 'star')}
            data-depth="0.8"
            aria-label="Star Rating"
          >
            <FiStar />
            {activeIcon === 'star' && (
              <div className={styles.iconTooltip}>Top rated items</div>
            )}
          </div>
          <div 
            className={`${styles.floatingIcon} ${styles.icon4} ${activeIcon === 'cart' ? styles.active : ''}`}
            onClick={() => setActiveIcon(activeIcon === 'cart' ? null : 'cart')}
            data-depth="0.5"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart />
            {activeIcon === 'cart' && (
              <div className={styles.iconTooltip}>Start shopping</div>
            )}
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
