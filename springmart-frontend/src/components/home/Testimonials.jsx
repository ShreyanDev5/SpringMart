// src/components/home/Testimonials.jsx
import React from "react";
import { FiStar } from "react-icons/fi";
import styles from "../../styles/components/home/Testimonials.module.scss";

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "SpringMart offers an amazing shopping experience with quality products and fast delivery. Highly recommended!",
      author: "Alex Mitchell",
      role: "Loyal Customer",
      initials: "AM"
    },
    {
      rating: 5,
      text: "The product selection is outstanding and the user interface makes shopping a breeze. I'm a happy customer!",
      author: "Sarah Parker",
      role: "Verified Buyer",
      initials: "SP"
    },
    {
      rating: 5,
      text: "I love the new design! The website is beautiful and makes shopping so much more enjoyable. Will definitely be back!",
      author: "Jamie Davis",
      role: "New Customer",
      initials: "JD"
    }
  ];

  return (
    <section className={styles.testimonialsSection}>
      <div className="section-header centered">
        <h2>What Our Customers Say</h2>
        <p>Trusted by thousands of shoppers</p>
      </div>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial, index) => (
          <div className={styles.testimonialCard} key={index}>
            <div className={styles.testimonialRating}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <FiStar key={i} />
              ))}
            </div>
            <p className={styles.testimonialText}>{testimonial.text}</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.testimonialAvatar}>{testimonial.initials}</div>
              <div className={styles.testimonialInfo}>
                <h4>{testimonial.author}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
