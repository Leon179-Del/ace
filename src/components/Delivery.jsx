import React, { useState } from 'react';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom';
import "../css/delivery.css";

const Delivery = () => {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();

  // 1. State Management
  const [deliveryData, setDeliveryData] = useState({ fee: 0, distance: 0 });
  const [loading, setLoading] = useState(false);

  // 2. Fetch Delivery Calculation from Flask
  const calculateDelivery = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/calculate_delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, lng }),
      });
      const data = await response.json();
      setDeliveryData({ fee: data.delivery_fee, distance: data.distance_km });
    } catch (error) {
      console.error("Error calculating delivery:", error);
    }
    setLoading(false);
  };

  // 3. Total Calculation
  const totalWithDelivery = getCartTotal() + deliveryData.fee;

  return (
    <div className="delivery-container">
      <h2>Delivery Details</h2>

      <div className="delivery-info">
        {loading ? (
          <p>Calculating delivery...</p>
        ) : (
          <>
            <p>Distance: {deliveryData.distance} KM</p>
            <p>Delivery Fee: KES {deliveryData.fee}</p>

            <div className="delivery-timer">
              <strong>
                {deliveryData.distance < 10 
                  ? "🚀 Delivery within 2 days (Near Shop)" 
                  : "📦 Delivery within 7 days"}
              </strong>
            </div>
            
            <hr />
            
            <h3>Total to Pay: KES {totalWithDelivery}</h3>
            
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/checkout', { state: { total: totalWithDelivery } })}
              disabled={loading}
            >
              Complete Payment (KES {totalWithDelivery})
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Delivery;
