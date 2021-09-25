import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import Rating from 'react-rating';

const Product = (props) => {
    // console.log(props);
    // destructing
    const {name, img ,seller, price, stock, star} = props.product;
    // evabeo use kora jay abr button e o direct variable name boshay deya jay
    // const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className = 'product'>
            <div>
            <img src={img} alt="" />
            </div>
        <div>
        <h4 className = 'product-name'>{name}</h4>
         <p><small>By:  {seller}</small></p>
         <p>Price : ${price}</p>
         <p><small>only {stock} left in stock - order soon</small></p>
         {/* rating  */}
         <Rating
           initialRating={star}
           emptySymbol="far fa-star icon-color"
           fullSymbol="fas fa-star icon-color "
         readonly></Rating>
         <br />
         <button  onClick = {() => props.handleAddToCart(props.product)} className= "btn-regular"><FontAwesomeIcon icon={faShoppingCart} />  Add To Cart</button>
        </div>

        </div>
    );
};

export default Product;