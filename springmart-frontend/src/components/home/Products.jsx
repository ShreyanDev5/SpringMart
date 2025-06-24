// src/components/home/Products.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "../ProductCard";
import styles from "../../styles/components/home/Products.module.scss";

const Products = React.forwardRef(({ products, loading, error, imageVersion }, ref) => {
  return (
    <section ref={ref} className={styles.productsSection}>
      <div className="section-header centered">
        <h2>Featured Products</h2>
        <p>Discover our handpicked selection of premium products</p>
      </div>
      <div className={styles.productGrid}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <p>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products found. Check back later!</p>
          </div>
        ) : (
          <>
            {products.map(product => (
              <ProductCard key={product.id} product={product} imageVersion={imageVersion} />
            ))}
            <div className={styles.viewAllContainer}>
              <Link to="/products" className={styles.viewAllLink}>
                View All Products <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

export default Products;
