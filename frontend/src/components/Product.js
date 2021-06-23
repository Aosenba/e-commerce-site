import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = (props) => {
    const {product} = props;
 

    return (
        <div className="card" key={product._id}>
         <Link to={`/product/${product._id}`}>
         <img className="medium" src={product.image} alt={product.name}/>
         </Link>
          
         
        <div className="card-body">
            <Link to={`/product/${product._id}`}>
                <h5>{[product.name]}</h5>
                </Link>
      
            <Rating rating={product.rating} numReviews={product.numReviews}/>
            <div className="row">
            <h4><i className="fa fa-inr"></i> {product.price}</h4>
            <div>
                <Link to={`/seller/${product.seller._id}`}>
                    {product.seller.seller.name}
                </Link>
            </div>
            </div>
          
       </div>
       
       </div>
    )
}

export default Product
