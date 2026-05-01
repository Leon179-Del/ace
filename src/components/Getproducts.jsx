import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from "./Carousel";
// Import the useCart hook to access the global cart state
import { useCart } from './CartContext'; 
// 1. Import the external CSS file
import '../css/productcard.css';

const Getproducts = () => {

// Access the addToCart function from our Global Context
const { cart, addToCart, removeFromCart, cartTotal } = useCart();

//initgializing hook to help you manage the state of your application
const [products,setProducts] = useState([]);
const[loading,setLoading] = useState(false);
const[error,setError] = useState ("");

//Declare the navigate hook
const navigate = useNavigate()

// below we specify the image base url
const img_url = "https://aceelectronics.alwaysdata.net/static/images/"

//create a function to help you fetch the products from your API
const fetchProducts = async() =>{
    try{

      //4.update the loading hook
      setLoading(true)

      //5.Interact with your endpoint for fetching the product
      const response = await axios.get("https://aceelectronics.alwaysdata.net/api/get_product")
      //6.update the products hook with the response given from the API
      setProducts(response.data)
      //7.set the loading hook back to default
      setLoading(false)

    }
   catch(error){
    //if there is an error
    //set the loading hook back to default
    setLoading(false)

    //update the error hook with a message
    setError(error.message)


    }
}

//We shal use the use effect hook that automatically re-render new features incase of any changes.
useEffect(() => {
  fetchProducts()
}, [])

//Destructure the details  passed from the get products details
const{product} = useLocation().state || {}

  return (
    <div className='row products-wrapper'>
      {/* The Carousel stays at the very top */}
      <Carousel />

      {/* 3. NEW: HORIZONTAL SELECTION BAR */}
      {cart.length > 0 && (
        <div className="cart-selection-bar mb-4">
          <div className="d-flex align-items-center w-100 overflow-auto">
            <span className="me-3" style={{ color: '#fbbf24', fontWeight: 'bold', minWidth: '130px' }}>
              YOUR TRAY:
            </span>
            
            <div className="d-flex gap-3">
              {/* Only showing the first 6 items horizontally to keep it clean */}
              {cart.slice(0, 6).map((item) => (
                <div key={item.product_id} className="cart-item-mini">
                  <img src={img_url + item.product_photo} alt={item.product_name} />
                  <div className="mini-item-name">{item.product_name}</div>
                  <button 
                    className="mini-remove-btn" 
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Checkout button on the right */}
            <div className="ms-auto d-flex align-items-center">
               <div className="me-3 text-white d-none d-md-block">
                  Total: <span style={{color: '#fbbf24'}}>Ksh {cartTotal.toLocaleString()}</span>
               </div>
               <button 
                 className="signup" 
                 style={{ padding: '8px 20px', fontSize: '0.8rem' }}
                 onClick={() => navigate('/cart')}
               >
                 VIEW CART
               </button>
            </div>
          </div>
        </div>
      )}

      <h3 className='shop-title text-center mt-3'>Shop With Us!</h3>
      
      {loading && <Loader/> }
      <h4 className='text-danger'> {error} </h4>
      
      {/* map the products fetched from the API to the user interface */}
      {products.map((product) => (
        <div key={product.id} className="col-md-3 d-flex justify-content-center mb-4">
          
          {/* 2. Added 'custom-product-card' for external styling */}
          <div className="card custom-product-card shadow">
            
            <div className="product-img-container">
              <img
               src= {img_url + product.product_photo}
               alt={product.product_name}
               className='product_img'
               />
            </div>

            <div className="card-body custom-card-body">
              <h5 className='product-name'> {product.product_name} </h5>
              
              <p className='product-desc'> 
                {product.product_description.slice(0,80)}... 
              </p>

              <h4 className="product-price">Ksh {product.product_cost} </h4>
              
              {/* Updated button to add items to the cart instead of navigating away immediately */}
              <button 
                className='btn purchase-btn' 
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Getproducts;