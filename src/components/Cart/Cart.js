import React from 'react';
import './Cart.css';
const Cart = (props) => {
    console.log(props);
    const {cart } = props;
    // console.log(props.children);
    let totalQuantity = 0;
    let total = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity =1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }
        // total calculation
        const shipping = total > 0 ? 15 : 0 ;
        const tax = (total + shipping) * 0.10;
        const grandTotal = total + shipping + tax;

    
    return (
        <div>
           <h2>Order Summary</h2>
          <p>Items ordered :  {totalQuantity} </p> 
          <p> Items Total : ${total.toFixed(2)} </p> 
          <p>Shipping : ${shipping}</p>
          <p>Tax : ${tax.toFixed(2)}</p>
          <p>Grand Total : ${grandTotal.toFixed(2)}</p>
          {props.children}
        </div>
    );
};

export default Cart;