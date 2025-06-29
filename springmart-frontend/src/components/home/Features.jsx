// src/components/home/Features.jsx
import React from "react";
import { FiShoppingBag, FiTag, FiShield, FiStar, FiZap, FiHeart } from "react-icons/fi";
import styles from "../../styles/components/home/Features.module.scss";

const Features = () => {
  const features = [
    { 
      icon: <FiShoppingBag />, 
      title: "Curated Collection", 
      description: "Handpicked products from trusted brands and sellers",
      highlight: "Premium"
    },
    { 
      icon: <FiZap />, 
      title: "Lightning Fast Delivery", 
      description: "Same-day dispatch with real-time tracking",
      highlight: "Fast"
    },
    { 
      icon: <FiTag />, 
      title: "Smart Savings", 
      description: "Best price guarantee with exclusive member discounts",
      highlight: "Save"
    },
    { 
      icon: <FiShield />, 
      title: "Secure Shopping", 
      description: "Bank-grade encryption and buyer protection",
      highlight: "Secure"
    }
  ];

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerBadge}>
          <FiStar className={styles.badgeIcon} />
          <span>Why Choose SpringMart</span>
        </div>
        <h2 className={styles.sectionTitle}>Experience Shopping Reimagined</h2>
        <p className={styles.sectionSubtitle}>
          Discover the difference with our premium shopping experience
        </p>
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <div className={styles.featureIconWrapper}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.iconGlow}></div>
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <span className={styles.featureHighlight}>{feature.highlight}</span>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
            <div className={styles.cardBackground}>
              <div className={styles.cardGradient}></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Stats Section */}
      <div className={styles.mobileFeatures}>
        <div className={styles.featuresStats}>
          <div className={styles.statCard}>
            <FiHeart className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <FiStar className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statNumber}>4.9★</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
