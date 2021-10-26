import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import {getStoredCart , clearTheCart} from '../../utilities/fakedb';
import './Shipping.css';



const Shipping = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const {user} = useAuth();
    const onSubmit = data => {
      const savedCart = getStoredCart();
      data.order = savedCart;
      // console.log(data);
       fetch('http://localhost:5000/orders' ,{
          method : 'POST' ,
          headers : {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(data)
       })
       .then(res => res.json())
       .then(result => {
        //  console.log(result);
        if(result.insertedId){
          alert('Order processed successfully');
         clearTheCart();
          reset();
        }
       })
    }
    return (
        <div className= 'shipping-form'>
         <form onSubmit={handleSubmit(onSubmit)}>
     
      <input  placeholder={user.displayName}   defaultValue="" {...register("name")} />
      
       
      <input placeholder={user.email}   {...register("email", { required: true })} />
     
      {errors.email && <span className ='error'>This field is required</span>}
      <input placeholder="Address"     defaultValue="" {...register("address")} />
      <input placeholder="City"     defaultValue="" {...register("city")} />
      <input placeholder="Phone Number"     defaultValue="" {...register("phone")} />
      <input type="submit" />
    </form>
        </div>
    );
};

export default Shipping;