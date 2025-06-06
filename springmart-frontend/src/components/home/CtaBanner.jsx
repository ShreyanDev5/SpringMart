// src/components/home/CtaBanner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import styles from "../../styles/components/home/CtaBanner.module.scss";

const CtaBanner = () => {
  return (
    <section className={styles.ctaBanner}>
      <div className={styles.ctaContent}>
        <h2>Ready to find something amazing?</h2>
        <p>Join thousands of happy customers shopping with us today</p>
        <div className={styles.ctaButtons}>
          <Link to="/products" className={`${styles.ctaButton} btn btn-outline-light`}>
            Browse Products <FiArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
