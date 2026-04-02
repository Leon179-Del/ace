import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/signin.css';

const Signin = () => {

// define the two hooks for capturing /storing the users input
const[email, setEmail] = useState("");
const[password, setPassword] =useState("");

// declare the three additional hooks
const[loading,setLoading] =useState("");
const[success,setSuccess] =useState("");
const[error,setError] =useState("");

// below is the function to handle submit
const handlesubmit = async (e) =>{
  e.preventDefault()
  // update the loading hook with a message
  setLoading("please wait while we authenticate your account.........")
  
  try{
    // create a formdata object that will hold the email and the password
    const formdata = new FormData()

    // 10. Insert/append the email and the password on the formData created.
    formdata.append("email", email)
    formdata.append("password", password)

    // interact with axios on response
    const response = await axios.post("https://leonlangat.alwaysdata.net/api/signin", formdata)

    // set loading hook back to default
    setLoading("")

    // check whether the user exists as part of your response from the API
    if(response.data.user){
      
      // 1. Store the full user object
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 2. IMPORTANT: Store the specific role from your database
      // This assumes your API returns the role inside the user object or response data
      const userRole = response.data.user.role || "user"; 
      localStorage.setItem("role", userRole);

      // 3. Set the login token
      localStorage.setItem("token", "logged_in");

      setSuccess("Login successful! Redirecting...")

      // 4. FIX: Use window.location.href to force the App to update the Admin status immediately
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      
    }
    else{
      setError("Login Failed. Please try again...")
    }
}
catch(error)
{
  setLoading("")
  setError("Oops, Something went wrong. Try Again ...")
}
}


  return (
    <div className='row justify-content-center mt-4'>
    <div className="col-md-6 card shadow p-4 signin-card">
        <h1 className='text-warning'>Sign In</h1>

        <h5 className='text-info'>{loading}</h5>
        <h3 className='text-success'>{success}</h3>
        <h3 className='text-danger'>{error}</h3>


        <form onSubmit={handlesubmit}>
          <input type="email" 
          placeholder='Enter the Email adress here....'
          className='form-control'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          /> <br />

           <input type="password" 
          placeholder='Enter your password here....'
          className='form-control'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}

          /> <br />
           <br /> 

          <input type="submit"
          value="Signin"
          className='btn btn-primary' />

          <span className="ms-2">Dont have an Account? <Link to={'/signup'}>Register</Link></span>
            </form>
      </div>
    </div>
  )
}

export default Signin;