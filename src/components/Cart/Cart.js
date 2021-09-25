import React from 'react';
import './Cart.css';
const Cart = (props) => {
    // console.log(props.cart);
    const {cart } = props;
    // let total = 0;
    // for(const product of cart){
    //     total = total + product.price;
    // }
    // reduce
    const productReducer = (previous, product) =>
        previous + product.price;
        const total = cart.reduce(productReducer ,0);
        // total calculation
        const shipping = total > 0 ? 15 : 0 ;
        const tax = (total + shipping) * 0.10;
        const grandTotal = total + shipping + tax;

    
    return (
        <div>
           <h2>Order Summary</h2>
          <p>Items ordered :  {props.cart.length} </p> 
          <p> Items Total : ${total.toFixed(2)} </p> 
          <p>Shipping : ${shipping}</p>
          <p>Tax : ${tax.toFixed(2)}</p>
          <p>Grand Total : ${grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;