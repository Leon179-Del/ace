import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";
import "../css/footer.css";
import { useEffect } from "react";

const Footer = () => {
    useEffect(() => {
  const footer = document.querySelector(".footer");

  if (footer) {   // ✅ important safety check
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footer.classList.add("show-footer");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(footer);
  }
}, []);
  return (
    <footer className="footer">
      
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="logo">Ace Electronics</h2>
          <p>Your trusted store for quality electronics at affordable prices.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          {/* <Link to="/addproducts">Add Products</Link> */}
          <Link to="/makepayment">Make Payment</Link>
          <Link to="/signup">Signup</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p><FaPhone /> +254 113531208</p>
          <p><FaEnvelope /> support@ace.com</p>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="socials">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Ace Electronics. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;