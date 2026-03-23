import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaCreditCard, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
  <img 
    src="static/images/logo.png" 
    alt="Ace Logo" 
    className="nav-logo-img"
  />
  <span>Ace</span>
</div>

      <div className="nav-links">
        <Link to="/" className="nav-btn">
          <FaHome /> Home
        </Link>

        <Link to="/addproducts" className="nav-btn">
          <FaPlus /> Add Products
        </Link>

        <Link to="/payment" className="nav-btn">
          <FaCreditCard /> Payment
        </Link>

        <Link to="/signin" className="nav-btn">
          <FaSignInAlt /> Signin
        </Link>

        <Link to="/signup" className="nav-btn signup">
          <FaUserPlus /> Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;