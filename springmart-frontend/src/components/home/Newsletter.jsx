// src/components/home/Newsletter.jsx
import React, { useState } from "react";
import styles from "../../styles/components/home/Newsletter.module.scss";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    console.log("Newsletter subscription for:", email);
    setEmail("");
    // You could add a success message or toast notification here
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterContent}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
        <form className={styles.newsletterForm} onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Your email address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
