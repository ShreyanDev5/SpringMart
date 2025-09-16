// src/components/home/Features.jsx
import React, { useState } from "react";
import { FiShoppingBag, FiTag, FiShield, FiStar, FiZap } from "react-icons/fi";
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

  // State to track touch states for each card
  const [touchStates, setTouchStates] = useState({});

  // Handle touch start event
  const handleTouchStart = (index) => {
    setTouchStates(prev => ({
      ...prev,
      [index]: 'touch-hover'
    }));
  };

  // Handle touch end event
  const handleTouchEnd = (index) => {
    // Add active state briefly for visual feedback
    setTouchStates(prev => ({
      ...prev,
      [index]: 'touch-active'
    }));
    
    // Remove active state after a short delay
    setTimeout(() => {
      setTouchStates(prev => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    }, 150);
  };

  // Handle touch cancel event
  const handleTouchCancel = (index) => {
    setTouchStates(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  return (
    <section className={styles.features}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerBadge}>
          <FiStar className={styles.badgeIcon} />
          <span>Why Choose SpringMart</span>
        </div>
        <h2 className={styles.sectionTitle}>Experience Shopping Reimagined</h2>
        <p className={styles.sectionSubtitle}>
          Discover the difference with our shopping experience
        </p>
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div 
            className={`${styles.featureCard} ${touchStates[index] || ''}`}
            key={index}
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={() => handleTouchEnd(index)}
            onTouchCancel={() => handleTouchCancel(index)}
          >
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
    </section>
  );
};

export default Features;
