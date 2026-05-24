import React from "react";
import styles from "../../../styles/components/ProductList.module.scss";

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonDetails}>
        <div className={styles.skeletonBrand} />
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonPrice} />
        <div className={styles.skeletonStock} />
        <div className={styles.skeletonActions}>
          <div className={styles.skeletonButton} />
          <div className={styles.skeletonButton} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;