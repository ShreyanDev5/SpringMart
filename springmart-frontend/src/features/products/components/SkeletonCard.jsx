import React from "react";
import styles from "../../../styles/components/ProductList.module.scss";

function SkeletonCard() {
    return <div className={styles.skeletonCard} aria-hidden="true" />;
}

export default SkeletonCard;