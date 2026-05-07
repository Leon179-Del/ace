import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaHome, FaPlus, FaCreditCard, FaSignInAlt, FaUserPlus, 
  FaSignOutAlt, FaUser, FaBars, FaShoppingCart, FaTruck,
  FaTools // Added for Services/Installations
} from "react-icons/fa";
import "../css/navbar.css";
import { useState } from "react";
import { useCart } from "./CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const isLoggedIn = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate('/')}>
        <img src="static/images/logo.png" alt="Ace Logo" className="nav-logo-img" />
        <span>Ace</span>
      </div>

      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <NavLink to="/" end className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
          <FaHome /> Home
        </NavLink>

        {role === "admin" && (
          <NavLink to="/addproducts" className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
            <FaPlus /> Add Products
          </NavLink>
        )}

        {/* --- Added Services Button --- */}
        <NavLink to="/installations" className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
          <FaTools /> Services
        </NavLink>

        <NavLink to="/makepayment" className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
          <FaCreditCard /> Payment
        </NavLink>

        <NavLink to="/delivery" className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
          <FaTruck /> Delivery
        </NavLink>

        <button 
          className="nav-btn cart-toggle-btn" 
          onClick={() => navigate('/cart')} 
          style={{ position: 'relative', background: 'transparent', border: 'none' }}
        >
          <FaShoppingCart />
          {cart.length > 0 && <span className="cart-badge-count">{cart.length}</span>}
        </button>

        {!isLoggedIn ? (
          <>
            <NavLink to="/signin" className={({ isActive }) => "nav-btn " + (isActive ? "active" : "")}>
              <FaSignInAlt /> Signin
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => "nav-btn signup " + (isActive ? "active" : "")}>
              <FaUserPlus /> Signup
            </NavLink>
          </>
        ) : (
          <>
            <span className="nav-user">
              <FaUser /> {user?.username || user?.email}
            </span>
            <button onClick={handleLogout} className="nav-btn logout">
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
