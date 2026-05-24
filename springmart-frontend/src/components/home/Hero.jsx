// src/components/home/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import styles from "../../styles/components/home/Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Extremely bold, crisp typography */}
        <h1 className={styles.heroTitle}>
          Designed for simplicity.<br />
          Built for scale.
        </h1>
        
        {/* Airiness and sophisticated secondary text */}
        <p className={styles.heroSubtitle}>
          A refined <span className={styles.highlight}>e-commerce</span> experience featuring instant search, smooth interactions, and a minimalist design.
        </p>
        
        {/* Apple's classic chevron text links instead of heavy bulky buttons */}
        <div className={styles.ctaButtons}>
          <Link to="/products" className={styles.textLink}>
            <span>Browse Products</span>
            <FiChevronRight className={styles.chevron} />
          </Link>
          <Link to="/add" className={styles.textLinkSecondary}>
            <span>Add Product</span>
            <FiChevronRight className={styles.chevron} />
          </Link>
        </div>
      </div>

      {/* Modern, glassmorphic presentation graphic that showcases high-quality UI */}
      <div className={styles.heroGraphic}>
        <div className={styles.mockupContainer}>
          <div className={styles.windowHeader}>
            <span className={styles.dotRed}></span>
            <span className={styles.dotYellow}></span>
            <span className={styles.dotGreen}></span>
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.previewCard}>
              <div className={styles.badge}>Featured</div>
              <div className={styles.glowEffect}></div>
              <h3>Curated Collections</h3>
              <p>Handpicked products designed to amaze.</p>
              <div className={styles.cardFooter}>
                <span className={styles.price}>$129.00</span>
                <span className={styles.status}>In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
