import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // data load
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const [page , setPage] = useState(0);
    const [pageCount , setPageCount] = useState(0);

    // search display product part
    const [displayProducts,setDisplayProducts] = useState([]);
    const size= 10;

    useEffect ( () =>{
        // console.log('producet api called')
        fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
        .then(res => res.json())
        .then(data =>{
            setProducts(data.products);
            setDisplayProducts(data.products);
            const count = data.count;
            const pageNumber = Math.ceil(count/size);
            setPageCount(pageNumber);
        });
    },[page]);
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
              <div className="pagination">
                  {
                      [...Array(pageCount).keys()].map(number => <button 
                        className={number === page ? 'selected' : ''}
                        key={number} 
                        onClick = {() => setPage(number)}
                      >{number +1}</button>)
                  }
              </div>
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