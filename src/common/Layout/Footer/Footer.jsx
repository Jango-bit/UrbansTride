import React from 'react';
import classes from './Footer.module.scss';
const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerSection}>
          <h3>Shop</h3>
          <ul>
            <li><a href="/men">Men's Shoes</a></li>
            <li><a href="/women">Women's Shoes</a></li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li>123 Shoe Street, Fashion City</li>
            <li>Email: support@shoeshop.com</li>
            <li>Phone: +123 456 7890</li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Follow Us</h3>
          <ul className={classes.socialMedia}>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>

        <div className={classes.footerSection}>
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for the latest updates on new arrivals, sales, and more!</p>
          <form className={classes.newsletterForm}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <p>&copy; 2024 ShoeShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
