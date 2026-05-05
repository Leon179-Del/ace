import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // To get product totals
import { useNavigate } from 'react-router-dom';
import "../css/delivery.css";
const Delivery = () => {
    const { cart, getCartTotal } = useCart();
    const navigate = useNavigate();

    // 1. State Management
    const [userLocation, setUserLocation] = useState({ lat: -1.286, lng: 36.817 }); // Default
    const [deliveryData, setDeliveryData] = useState({ fee: 0, distance: 0 });
    const [loading, setLoading] = useState(false);

    const SHOP_LOCATION = { lat: -1.286389, lng: 36.817223 };

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
            
            {/* Map Placeholder - You would embed Google Maps here */}
            <div style={{ height: '300px', background: '#e0e0e0', marginBottom: '20px' }}>
                <p>Map showing Shop and Your Location</p>
            </div>

            <div className="delivery-info">
                <p>Distance: {deliveryData.distance} KM</p>
                <p>Delivery Fee: KES {deliveryData.fee}</p>
                
                {/* Timer/Delivery Estimate Logic */}
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
                >
                    Complete Payment (KES {totalWithDelivery})
                </button>
            </div>
        </div>
    );
};

export default Delivery;