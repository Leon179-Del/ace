import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../css/productcard.css';
// We'll add cart styles here

const CartSidebar = () => {
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2>Your Selection</h2>
        <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-msg">Your cart is empty...</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item-mini">
              <img src={`https://leonlangat.alwaysdata.net/static/images/${item.product_photo}`} alt="" />
              <div className="item-info">
                <h5>{item.product_name}</h5>
                <p>Ksh {item.product_cost}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="total-box">
            <span>Total:</span>
            <span>Ksh {cartTotal}</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={() => {
              setIsCartOpen(false);
              navigate("/makepayment");
            }}
          >
            Complete Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;