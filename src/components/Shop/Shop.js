import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // data load
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    // search display product part
    const [displayProducts,setDisplayProducts] = useState([]);

    useEffect ( () =>{
        // console.log('producet api called')
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data =>{
            setProducts(data);
            setDisplayProducts(data);
        });
    },[]);

    // get from localStorage
    useEffect (() => {
        // console.log('localStorage called')
        if(products.length){
            const savedCart=  getStoredCart();
            // console.log(savedCart);
            // localStorage e permently(reload deyar por jabena) set korar jonnon ekta empty array
            const storedCart = [];
    // object tai for in use kora hoyeche
    for(const key in savedCart){
        // console.log(key);
        const addedProduct = products.find(product => product.key === key);
        // console.log(key , addedProduct) ;
        storedCart.push(addedProduct);
    }
    setCart(storedCart);
        }

    },[products])

    // eventhandler 
    const handleAddToCart = product => {
        // console.log('clicked');
        // console.log(product.name);
        console.log(product);
         const newCart = [...cart , product];
         setCart(newCart);
        
        // save to  localStorage  
         addToDb(product.key)
    }
const handleSearch = event =>{
    const searchValue = event.target.value
    // console.log(searchValue);
    const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
    setDisplayProducts(matchedProducts);
    console.log(matchedProducts.length);
}
    return (
         // search field 
         <>
         <div className="search-container">
             <input type="text" 
             onChange ={handleSearch}
             placeholder ="search here"/>
         </div>
        <div className = "shop-container">
            <div className="product-container">
              {/* <h3>Products :{products.length} </h3> */}
              {
                  displayProducts.map(product => <Product 
                    key ={product.key}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                  ></Product>)
              }
            </div>
             <div className="cart-container">
                       <Cart cart= {cart}  ></Cart>
             </div>
     
        </div>
        </>
    );
};

export default Shop;