import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/signup.css';


const Signup = () => {
  // initialize the hooks
const [username, setUsername] = useState("");
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [phone, setPhone] = useState("")

//Define the three states an application will move to
const [loading, setLoading] = useState("");
const [success, setSuccess] =useState("");
const [error, setError] =useState("");

// ✅ add navigate hook
const navigate = useNavigate();


//below is a function that will handle the submit action
const handleSubmit = async(e) =>{
  //below we prevent our site from reloading
  e.preventDefault()

  //update our loading hook with a message that will be displayed to the users who are trying to register
setLoading("Please wait as registration is in progress....")

try{
  //create a form data object thatwill enable you to capture the four details entered on the form
  const formdata = new FormData();

  //insert the four details in terms of kry--value pairs(username,email,phone,password)
  formdata.append("username", username);
  formdata.append("email", email);
  formdata.append("password", password);
  formdata.append("phone", phone)

  //by use of axios we can access the method post
  const response =await axios.post("https://leonlangat.alwaysdata.net/api/signup",formdata)

  //set back the loading to default
  setLoading("")

  //just in case everything goes on well update the success hook with a message
  setSuccess(response.data.message)

  //  AUTO LOGIN AFTER SIGNUP
 localStorage.setItem("user", JSON.stringify({
  username: username,
  email: email
}));

  localStorage.setItem("token", "logged_in");
  localStorage.setItem("role", "user");

  //clear your hooks
  setUsername("");
  setEmail("");
  setPassword("");
  setPhone("");

  // ✅ redirect to home
  navigate("/");

}
catch(error){

  //set the loading back to default
  setLoading("")

  //update the error back with the message given back from the response
  setError(error.message)

}

}


  return(
    <div className='row justify-content-center mt-4 '>
   <div className="card col-md-6 shadow p-4 signup-card">
      <h1 className='text-warning' >Sign up</h1>

      <h5 className='text-success'>{loading}</h5>
      <h3 className='text-secondary'>{success}</h3>
      <h4 className='text-danger'>{error}</h4>

      <form onSubmit={handleSubmit}>

        <input type="text"
        placeholder='Enter the username'
        className='form-control'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        /> <br />

        {/* {username} */}


        <input type="email"
        placeholder='Enter Email Adress'
        className='form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        /> <br />

        {/* {email} */}

        <input type="password"
        placeholder='Enter password'
        className='form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        /> <br />

        {/* {password} */}

        <input type="number"
        placeholder='Enter the mobile Phone number'
        className='form-control' 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        /> <br />

        {/* {phone} */}

        <input type="submit" value="Signup" className='btn btn-primary' />
         Already have an Account? <Link to={'/signin'}>Signin</Link> 

      </form>
   </div>

    </div>
  )
}

export default Signup;
// Research on Axios module in reactjs