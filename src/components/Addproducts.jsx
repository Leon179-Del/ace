import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import "../css/addproduct.css";

const Addproducts = () => {
    const [product_name, setProductname] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    /* NAVIGATION PROBLEM COMMENT: 
       The footer link to this page isn't working because of the 'isAdmin' check in your Route. 
       If your 'isAdmin' state is false or null when the footer link is clicked, 
       React Router hits the <Navigate to="/" /> condition and sends you back home instantly. 
       To fix navigation, ensure 'isAdmin' is true before clicking. */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formdata = new FormData();
            formdata.append("product_name", product_name);
            formdata.append("product_description", product_description);
            formdata.append("product_cost", product_cost);
            // This ensures the actual file object is appended
            formdata.append("product_photo", product_photo);

            // FIXED: Changed endpoint from /api/add_products to /api/add_product 
            // to match your Flask backend exactly.
            const response = await axios.post(
                "https://aceelectronics.alwaysdata.net/api/add_product",
                formdata
            );

            setLoading(false);
            setSuccess(response.data.message);

            // Clear inputs
            setProductname("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
            setPreview("");
            e.target.reset();

            setTimeout(() => {
                setSuccess("");
            }, 5000);
        } catch (error) {
            setLoading(false);
            setError("Could not add product. Check your connection or login status.");
        }
    };

    return (
        <div className='row justify-content-center mt-4'>
            <div className="col-md-6 card shadow p-4 addproduct-card">
                <h3 className='text-info'>Upload Your Products</h3>
                {loading && <Loader />}
                <h3 className={`success-msg ${success ? "show" : ""}`}> {success} </h3>
                <h4 className='text-danger'>{error}</h4>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter the product name' className='form-control' required value={product_name} onChange={(e) => setProductname(e.target.value)} />
                    <br />
                    <input type="text" placeholder='Enter the product description' className='form-control' required value={product_description} onChange={(e) => setProductDescription(e.target.value)} />
                    <br />
                    <input type="number" placeholder='Enter the price of the product' className='form-control' required value={product_cost} onChange={(e) => setProductCost(e.target.value)} />
                    <br />
                    <label>Product photo</label>
                    <input type="file" className='form-control' required accept='image/*' onChange={(e) => {
                        const file = e.target.files[0];
                        setProductPhoto(file);
                        setPreview(URL.createObjectURL(file));
                    }} />
                    <br />
                    {preview && (
                        <img src={preview} alt="preview" className="preview-img" style={{ width: "100px", marginTop: "10px" }} />
                    )}
                    <br />
                    <input type="submit" value="Add Product" className='btn btn-info' />
                </form>
            </div>
        </div>
    )
}

export default Addproducts;
