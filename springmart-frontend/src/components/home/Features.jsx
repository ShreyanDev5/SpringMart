// src/components/home/Features.jsx
import React from "react";
import { FiShoppingBag, FiTag, FiTruck, FiShield } from "react-icons/fi";
import styles from "../../styles/components/home/Features.module.scss";

const Features = () => {
  const features = [
    { icon: <FiShoppingBag />, title: "Wide Selection", description: "Discover thousands of quality products" },
    { icon: <FiTruck />, title: "Fast Delivery", description: "Quick and reliable shipping" },
    { icon: <FiTag />, title: "Best Prices", description: "Competitive pricing every day" },
    { icon: <FiShield />, title: "Secure Payments", description: "100% secure checkout" }
  ];

  return (
    <section className={styles.features}>
      <div className="section-header centered">
        <h2>Why Choose SpringMart</h2>
        <p>We offer the best shopping experience</p>
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
