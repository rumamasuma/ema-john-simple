import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    return (
        <div className= "login-form">
           <div>
               <h2>Create your account </h2>
           <form onSubmit= "">
           <input type="email" name ="" id="" placeholder=" Your Email" />
           <br /> <br />
           <input type="password" name ="" id="" placeholder=" Your pasword" />
           <br /> <br />
           <input type="password" name ="" id="" placeholder="Re-enter  pasword" />
           <br /> <br />
           <input type="submit" value= "Submit" />
           </form>
           <p>Already have an account? <Link to ="/login">Login</Link></p>
      <div><p>You can login in using Google </p></div>
      <button className = "btn-regular">Google Sign In</button>
            </div> 
        </div>
    );
};

export default Register;