// src/components/home/Hero.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiTag, FiStar, FiArrowRight, FiShoppingCart, FiInfo } from "react-icons/fi";
import SearchBar from "../SearchBar";
import styles from "../../styles/components/home/Hero.module.scss";

const Hero = ({ onSearch }) => {
  const [showTooltip, setShowTooltip] = useState(false);
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
        {/* Removed seasonal tagline and product counter as requested */}
        <div className={styles.searchContainer}>
          <SearchBar onSearch={onSearch} />
        </div>
        <div className={`${styles.ctaButtons} ${styles.fadeIn}`} style={{animationDelay: '0.6s'}}>
          <Link to="/products" className={`btn btn-primary ${styles.ctaButton}`}>
            Shop Now <FiShoppingCart className="btn-icon" />
          </Link>
          <Link to="/add-product" className={`btn btn-outline ${styles.ctaButton}`}>
            Sell with Us
          </Link>
        </div>
      </div>
      <div className={styles.heroImage}>
        <div className={`${styles.heroCard} ${styles.premiumCard}`}>
          <div className={styles.heroCardBadge}>Featured</div>
          <div className={styles.heroCardContent}>
            <h3>Premium Collection</h3>
            <p>Exclusive products for you</p>
            <Link to="/products" className={styles.heroCardLink}>
              Explore <FiArrowRight />
            </Link>
          </div>
        </div>
        <div className={styles.floatingBadge} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          🛍️ Top Deals Today
          <FiInfo className={styles.infoIcon} />
          {showTooltip && (
            <div className={styles.tooltip}>Limited time offers with up to 50% off!</div>
          )}
        </div>
        <div className={styles.floatingIcons}>
          <div className={`${styles.floatingIcon} ${styles.icon1}`}>
            <FiShoppingBag />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon2}`}>
            <FiTag />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon3}`}>
            <FiStar />
          </div>
          <div className={`${styles.floatingIcon} ${styles.icon4}`}>
            <FiShoppingCart />
          </div>
        </div>
        <div className={styles.floatingShapes}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
