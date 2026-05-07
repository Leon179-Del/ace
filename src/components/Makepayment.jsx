import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useCart } from './CartContext'; 

const Makepayment = () => {
    // Access the global cart and the getter function from Context
    const { cart, getCartTotal } = useCart();
    const navigate = useNavigate();

    // Calculate total once. We use Math.round because M-Pesa APIs 
    // often fail if sent decimals (e.g., 100.50).
    const totalAmount = getCartTotal ? Math.round(getCartTotal()) : 0;

    const img_url = "https://aceelectronics.alwaysdata.net/static/images/";

    // Hooks to manage state
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        // Debugging: See exactly what is being sent to your API
        console.log("Attempting Payment:", { phone: number, amount: totalAmount });

        try {
            const formdata = new FormData();
            formdata.append("phone", number);
            formdata.append("amount", totalAmount); 

            const response = await axios.post("https://aceelectronics.alwaysdata.net/api/mpesa_payment", formdata);

            setLoading(false);
            setSuccess(response.data.message || "STK Push sent successfully! Check your phone.");
        }
        catch (err) {
            setLoading(false);
            // Log the full error to the console to help you debug the backend response
            console.error("Payment API Error:", err.response?.data);
            
            setError(err.response?.data?.message || "Payment request failed. Ensure number is 2547XXXXXXXX.");
        }
    };

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <h1 className="text-warning text-center mb-4">Make Payment - Lipa na Mpesa</h1>
                
                <div className="col-md-8 card shadow p-4 bg-dark text-white">
                    <div className="row">
                        {/* Summary of Items in Tray */}
                        <div className="col-md-6 border-end">
                            <h4 className="text-info">Order Summary</h4>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {cart.length > 0 ? (
                                    cart.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2 border-bottom pb-2">
                                            <img 
                                                src={img_url + item.product_photo} 
                                                alt={item.product_name} 
                                                style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} 
                                            />
                                            <div className="ms-3">
                                                <p className="mb-0 small">{item.product_name}</p>
                                                <b className="text-warning small">
                                                    Ksh {parseFloat(item.product_cost || 0).toLocaleString()}
                                                </b>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items in cart</p>
                                )}
                            </div>
                            <hr />
                            <h3>Total: <span className="text-warning">Ksh {totalAmount.toLocaleString()}</span></h3>
                        </div>

                        {/* Payment Form */}
                        <div className="col-md-6">
                            <form onSubmit={handlesubmit} className="mt-3">
                                {loading && <Loader />}
                                {success && <div className="alert alert-success p-2 fs-6">{success}</div>}
                                {error && <div className='alert alert-danger p-2 fs-6'>{error}</div>}

                                <label className="mb-2">Enter M-Pesa Phone Number:</label>
                                <input type="text" 
                                    className='form-control mb-3'
                                    placeholder='e.g. 254712345678'
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                
                                <button 
                                    type="submit" 
                                    className='btn btn-success w-100 fw-bold mb-3'
                                    disabled={loading || totalAmount <= 0}
                                >
                                    {loading ? "Processing..." : `Pay Ksh ${totalAmount.toLocaleString()}`}
                                </button>

                                <button type="button" className='btn btn-outline-light w-100' onClick={() => navigate("/")}>
                                    Back to Shop
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment;