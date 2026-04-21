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

  // App states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formdata = new FormData();

      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post(
        "https://leonlangat.alwaysdata.net/api/add_product",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);

      // Clear inputs
      setProductname("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      setPreview(""); // ✅ clear preview

      e.target.reset();

      setTimeout(() => {
        setSuccess("");
      }, 5000);

    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Try again...");
    }
  };

  return (
    <div className='row justify-content-center mt-4'>
      
      <div className="col-md-6 card shadow p-4 addproduct-card">
        
        <h3 className='text-info'>Upload Your Products</h3>

        {loading && <Loader />}
       

        {/* Success */}
        <h3 className={`success-msg ${success ? "show" : ""}`}>
          {success}
        </h3>

        {/* Error */}
        <h4 className='text-danger'>{error}</h4>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder='Enter the product name'
            className='form-control'
            required
            value={product_name}
            onChange={(e) => setProductname(e.target.value)}
          />
          <br />

          <input
            type="text"
            placeholder='Enter the product description'
            className='form-control'
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <br />

          <input
            type="number"
            placeholder='Enter the price of the product'
            className='form-control'
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
          />
          <br />

          <label>Product photo</label>
          <input
            type="file"
            className='form-control'
            required
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files[0];
              setProductPhoto(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          <br />

          {/* ✅ Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="preview-img"
            />
          )}

          <br />

          <input
            type="submit"
            value="Add Product"
            className='btn'
          />

        </form>

      </div>
    </div>
  )
}

export default Addproducts;