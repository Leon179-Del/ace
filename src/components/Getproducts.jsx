import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useLocation, useNavigate } from 'react-router-dom';

const Getproducts = () => {

//initgializing hook to help you manage the state of your application
const [products,setProducts] = useState([]);
const[loading,setLoading] = useState(false);
const[error,setError] = useState ("");

//Declare the navigate hook
const navigate = useNavigate()

// below we specify the image base url
const img_url = "https://leonlangat.alwaysdata.net/static/images/"

//create a function to help you fetch the products from your API
const fetchProducts = async() =>{
    try{

      //4.update the loading hook
      setLoading(true)

      //5.Interact with your endpoint for fetching the product
      const response = await axios.get("https://leonlangat.alwaysdata.net/api/get_product")
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

// console.log(products)

//Destructure the details  passed from the get products details
//The uselocation hook allows us to get / destructure the properties passedfrom the previous 
const{product} = useLocation().state || {}

// console.log("The details of the products are")



  return (
    <div className='row'>
      <h3 className='text-primary '>Available Electronics</h3>
      {loading && <Loader/> }
      <h4 className='text-danger'> {error} </h4>
      
      {/* map the products fetched from the API to the user interface */}


      {products.map((product) => (
        <div className="col-md-3 jistify-content-center mb-3">
        <div className="card shadow">
          <img
           src= {img_url + product.product_photo}
           alt="product name"
           className='product_img mt-3'
           />
          <div className="card-body">

            <h5 className='text-primary'> {product.product_name} </h5>

            <p className='text-dark'> {product.product_description.slice(0,100)}... </p>

            <h4 className="text-warning">Ksh {product.product_cost} </h4>
            <button className='btn btn-outline-info' onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
          </div>
        </div>
      </div>
      )  )}

    </div>
  )
}

export default Getproducts;
