import React, { useEffect } from 'react'
import Product from '../components/Product';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Cards from './Cards';
import Varieties from './Varieties';

const HomeView = () => {

 
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;



  useEffect(()=>{
         dispatch(listProducts({}));
  },[dispatch]);
  
    return (
      <>
      
      <Varieties/>
    
      <div className="carousel">
      <Cards/>
      </div>
    
       {loading? <LoadingBox></LoadingBox>
       :
       error? <MessageBox variant="danger">{error}</MessageBox>
       :
       <div className="row center">

       {
         products.map((product=>(
           <Product key={product._id} product={product}/>
         )
          ))
       } 
      </div>
       }
     
       </>
    )
}

export default HomeView
