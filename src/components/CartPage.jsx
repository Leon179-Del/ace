import React from 'react';
import { useCart } from './CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaLock, FaShoppingBasket } from 'react-icons/fa';
// Ensure your global/productcard CSS is imported to use those glow effects
import '../css/productcard.css'; 

const CartPage = () => {
  const { cart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container text-center vh-100 d-flex flex-column justify-content-center">
        <FaShoppingBasket size={80} style={{ color: 'rgba(251, 191, 36, 0.2)', marginBottom: '20px' }} />
        <h2 style={{ color: '#fbbf24', fontWeight: '800' }}>YOUR TRAY IS EMPTY</h2>
        <p style={{ color: '#fef3c7' }}>The aroma of fresh coffee is missing something... items!</p>
        <Link to="/" className="btn mt-3 mx-auto signup" style={{ width: '220px' }}>
          BROWSE COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      {/* Back Button with Hover Glow */}
      <button 
        onClick={() => navigate(-1)} 
        className="nav-btn mb-4" 
        style={{ border: '1px solid #fbbf24', background: 'transparent' }}
      >
        <FaArrowLeft /> CONTINUE SHOPPING
      </button>
      
      <h1 className="mb-5" style={{ color: '#fbbf24', fontWeight: '900', letterSpacing: '2px' }}>
        FINAL SELECTION
      </h1>

      <div className="row">
        {/* Left Side: Styled Product List */}
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.product_id} className="product-card mb-4 p-3 d-flex align-items-center" 
                 style={{ flexDirection: 'row', textAlign: 'left', minHeight: 'auto' }}>
              
              <div style={{ width: '120px', marginRight: '20px' }}>
                <img 
                  src={`https://aceelectronics.alwaysdata.net/static/images/${item.product_photo}`} 
                  alt={item.product_name} 
                  className="img-fluid rounded" 
                  style={{ border: '1px solid rgba(251, 191, 36, 0.3)', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                />
              </div>

              <div className="flex-grow-1">
                <h4 style={{ color: '#fbbf24', margin: '0' }}>{item.product_name}</h4>
                <p style={{ color: '#fef3c7', fontSize: '1.1rem', marginBottom: '0' }}>
                  Ksh {parseFloat(item.product_cost).toLocaleString()}
                </p>
                <span className="badge mt-2" style={{ border: '1px solid #fbbf24', color: '#fbbf24' }}>
                  QUANTITY: {item.quantity || 1}
                </span>
              </div>

              <div className="text-end">
                <button 
                  onClick={() => removeFromCart(item.product_id)} 
                  className="btn btn-outline-danger border-0"
                  style={{ fontSize: '1.2rem', transition: '0.3s' }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary Card */}
        <div className="col-lg-4">
          <div className="card p-4" style={{ 
            background: 'linear-gradient(135deg, #1a0f0d 0%, #2c1e1a 100%)', 
            border: '2px solid #fbbf24',
            borderRadius: '15px',
            position: 'sticky',
            top: '100px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ color: '#fbbf24', fontWeight: '800', textAlign: 'center' }}>SUMMARY</h3>
            <hr style={{ borderColor: '#fbbf24' }} />
            
            <div className="d-flex justify-content-between mb-3" style={{ color: '#fef3c7' }}>
              <span>Items:</span>
              <span>{cart.length}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-4 pt-3" style={{ borderTop: '1px solid rgba(251, 191, 36, 0.2)' }}>
              <span className="h5" style={{ color: '#fef3c7' }}>Total:</span>
              <span className="h4" style={{ color: '#fbbf24', fontWeight: '900' }}>
                Ksh {cartTotal.toLocaleString()}
              </span>
            </div>

            {/* The Dynamic Payment Button using the 'signup' class for that neon glow */}
            <button 
              onClick={() => navigate('/makepayment')} 
              className="btn w-100 py-3 signup d-flex justify-content-between align-items-center" 
              style={{ fontSize: '1.1rem', padding: '15px 25px' }}
            >
              <span><FaLock className="me-2" /> PAY NOW</span>
              <span>Ksh {cartTotal.toLocaleString()}</span>
            </button>
            
            <div className="mt-3 text-center" style={{ color: '#fef3c7', fontSize: '0.8rem', opacity: 0.6 }}>
              <small>Verified Secure Espresso Checkout</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;