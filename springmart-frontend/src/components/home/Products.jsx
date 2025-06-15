// src/components/home/Products.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProductCard from "../ProductCard";
import styles from "../../styles/components/home/Products.module.scss";

const Products = ({ products, loading, error }) => {
  return (
    <section className={styles.productsSection}>
      <div className="section-header with-action">
        <div>
          <h2>Featured Products</h2>
          <p>Explore our top picks for you</p>
        </div>
        <div className="action">
        <Link to="/products" className={styles.viewAllLink}>
          View All <FiArrowRight />
        </Link>
        </div>
      </div>

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
        <div className={styles.productGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
