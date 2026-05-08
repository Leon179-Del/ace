import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useCart } from './CartContext';

const Makepayment = () => {
    const { cart, getCartTotal } = useCart();
    const navigate = useNavigate();
    
    // IMAGE URL: Fixed to point to your working asset folder
    const img_url = "https://alwaysdata.net";
    
    const totalAmount = getCartTotal ? getCartTotal() : 0;
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        // PHONE FORMATTING: Convert 07... to 2547...
        let formattedNumber = number.trim();
        if (formattedNumber.startsWith("0")) {
            formattedNumber = "254" + formattedNumber.substring(1);
        }

        try {
            const formdata = new FormData();
            formdata.append("phone", formattedNumber);
            formdata.append("amount", totalAmount);

            // NEW API ENDPOINT: Pointing to the new payment service
            const response = await axios.post("http://leonlangat.alwaysdata.net/api/mpesa_payment", formdata);
            
            setLoading(false);
            setSuccess(response.data.message || "STK Push sent! Please check your phone.");
        } catch (err) {
            setLoading(false);
            // Catching the error message from the new API
            setError(err.response?.data?.message || "Payment through the new service failed. Try again.");
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <h1 className="text-warning text-center mb-4">Make Payment - Lipa na Mpesa</h1>
                <div className="col-md-8 card shadow p-4 bg-dark text-white">
                    <div className="row">
                        {/* Summary of Items */}
                        <div className="col-md-6 border-end">
                            <h4 className="text-info">Order Summary</h4>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {cart.map((item) => (
                                    <div key={item.product_id} className="d-flex align-items-center mb-2 border-bottom pb-2">
                                        <img 
                                            src={`${img_url}${item.product_photo}`} 
                                            alt={item.product_name} 
                                            style={{ width: '60px', height: '60px', borderRadius: '5px', objectFit: 'cover' }} 
                                            onError={(e) => { e.target.src = 'https://placeholder.com'; }} 
                                        />
                                        <div className="ms-3">
                                            <p className="mb-0 small">{item.product_name}</p>
                                            <b className="text-warning small">
                                                Ksh {parseFloat(item.product_cost || 0).toLocaleString()}
                                            </b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <h3>Total: <span className="text-warning">Ksh {(totalAmount || 0).toLocaleString()}</span></h3>
                        </div>

                        {/* Payment Form */}
                        <div className="col-md-6">
                            <form onSubmit={handlesubmit} className="mt-3">
                                {loading && <Loader />}
                                {success && <h3 className="alert alert-success p-2 fs-6">{success}</h3>}
                                {error && <h4 className='alert alert-danger p-2 fs-6'>{error}</h4>}
                                
                                <label className="mb-2">Enter M-Pesa Phone Number:</label>
                                <input 
                                    type="text" 
                                    className='form-control mb-3' 
                                    placeholder='07XXXXXXXX' 
                                    required 
                                    value={number} 
                                    onChange={(e) => setNumber(e.target.value)} 
                                />
                                
                                <button type="submit" className='btn btn-success w-100 fw-bold mb-3' disabled={loading || totalAmount === 0}>
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
    )
}

export default Makepayment;
