// src/components/home/Features.jsx
import React from "react";
import { FiShoppingBag, FiTag, FiTruck, FiShield } from "react-icons/fi";
import styles from "../../styles/components/home/Features.module.scss";

const Features = () => {
  const features = [
    { 
      icon: <FiShoppingBag />, 
      title: "Curated Collection", 
      description: "Handpicked products from trusted brands and sellers" 
    },
    { 
      icon: <FiTruck />, 
      title: "Lightning Fast Delivery", 
      description: "Same-day dispatch with real-time tracking" 
    },
    { 
      icon: <FiTag />, 
      title: "Smart Savings", 
      description: "Best price guarantee with exclusive member discounts" 
    },
    { 
      icon: <FiShield />, 
      title: "Secure Shopping", 
      description: "Bank-grade encryption and buyer protection" 
    }
  ];

  return (
    <section className={styles.features}>
      <div className="section-header centered">
        <h2>Why Choose SpringMart</h2>
        <p>Experience shopping reimagined</p>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
