import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // Removed useLocation
import Loader from './Loader';
import { useCart } from './CartContext'; // 1. Import your Cart Hook

const Makepayment = () => {
    // 2. Access the global cart and total instead of location state
    const { cart, cartTotal } = useCart();
    const navigate = useNavigate()

    const img_url = "https://aceelectronics.alwaysdata.net/static/images/"

    // Hooks to manage state
    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSuccess("")
        setError("")

        try {
            const formdata = new FormData()
            // 3. Send the phone number and the TOTAL from the tray
            formdata.append("phone", number)
            formdata.append("amount", cartTotal) 

            const response = await axios.post("https://aceelectronics.alwaysdata.net/api/mpesa_payment", formdata)

            setLoading(false)
            setSuccess(response.data.message || "STK Push sent successfully!")
        }
        catch (error) {
            setLoading(false)
            setError(error.response?.data?.message || "Payment request failed. Try again.")
        }
    }

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
                                {cart.map((item, index) => (
                                    <div key={index} className="d-flex align-items-center mb-2 border-bottom pb-2">
                                        <img src={img_url + item.product_photo} alt="" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                                        <div className="ms-3">
                                            <p className="mb-0 small">{item.product_name}</p>
                                            <b className="text-warning small">Ksh {item.product_cost}</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <h3>Total: <span className="text-warning">Ksh {cartTotal.toLocaleString()}</span></h3>
                        </div>

                        {/* Payment Form */}
                        <div className="col-md-6">
                            <form onSubmit={handlesubmit} className="mt-3">
                                {loading && <Loader />}
                                {success && <h3 className="alert alert-success p-2 fs-6">{success}</h3>}
                                {error && <h4 className='alert alert-danger p-2 fs-6'>{error}</h4>}

                                <label className="mb-2">Enter M-Pesa Phone Number:</label>
                                <input type="number" 
                                    className='form-control mb-3'
                                    placeholder='2547XXXXXXXX'
                                    required
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                
                                <button type="submit" className='btn btn-success w-100 fw-bold mb-3'>
                                    Pay Ksh {cartTotal.toLocaleString()}
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