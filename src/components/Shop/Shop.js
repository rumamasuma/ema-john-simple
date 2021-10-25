import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // data load
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart(products);
    // search display product part
    const [displayProducts,setDisplayProducts] = useState([]);

    useEffect ( () =>{
        // console.log('producet api called')
        fetch('./products.json')
        .then(res => res.json())
        .then(data =>{
            setProducts(data);
            setDisplayProducts(data);
        });
    },[]);
    const handleAddToCart = product => {
        const existsProduct = cart.find(pd =>pd.key === product.key)
        let newCart = [];
        if(existsProduct){
       const restProduct = cart.filter(pd => pd.key !== product.key);
      existsProduct.quantity = existsProduct.quantity + 1;
      newCart = [...restProduct ,existsProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart , product];
        }
         setCart(newCart);
        // save to  localStorage  
      addToDb(product.key);
    }

    // get from localStorage
    // useEffect (() => {
    //     // console.log('localStorage called')
    //     if(products.length){
    //         const savedCart=  getStoredCart();
    //         console.log(savedCart);
    //         // localStorage e permently(reload deyar por jabena) set korar jonnon ekta empty array
    //         const storedCart = [];
    // // object tai for in use kora hoyeche
    // for(const key in savedCart){
    //     // console.log(key,savedCart[key]);
    //     const addedProduct = products.find(product => product.key === key);
    //     // console.log(key , addedProduct) ;
    //     if(addedProduct){
    //         const quantity = savedCart[key];
    //         addedProduct.quantity = quantity;
    //         // console.log(addedProduct);
    //         storedCart.push(addedProduct);
    //     }
       
    // }
    //      setCart(storedCart);
    //  }

    // },[products])

    // eventhandler 

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
                       <Cart cart= {cart}  >
                        <Link to= "/review">
                        <button  className= "btn-regular">Review your order</button>
                        </Link>
                       </Cart>
             </div>
     
        </div>
        </>
    );
};

export default Shop;