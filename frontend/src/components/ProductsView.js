import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import Product from './Product';

const ProductsView = (props) => {
    const productList = useSelector((state) => state.productList);
    const {products,error,loading}=productList;
    const productCategory= props.match.params.id;
    const dispatch = useDispatch();
    console.log(productList)
    useEffect(() => {
        dispatch(detailsProduct(productCategory));
     }, [dispatch, productCategory]);
    return (
        <div className="products-view">
            <div className="product-nav">

            </div>
            {loading? <LoadingBox></LoadingBox>
       :
       error? <MessageBox variant="danger">{error}</MessageBox>
       :
       <div className="row center">

       {
         products.map((product=>(
             product.category===productCategory &&
           <Product key={product._id} product={product}/>
         )
          ))
       } 
      </div>
       }
            
        </div>
    )
}

export default ProductsView
