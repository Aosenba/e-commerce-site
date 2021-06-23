import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import { detailsProduct } from '../actions/productActions';
const ProductView = (props) => {
    const [qty, setQty]= useState(1);
    const dispatch = useDispatch();
    const productId= props.match.params.id;
    const {loading,error,product} =useSelector((state)=>state.productDetails);
    useEffect(() => {
       dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler =()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
  console.log(product)

    return (
        <div>
       {loading? <LoadingBox></LoadingBox>
       :
       error? <MessageBox variant="danger">{error}</MessageBox>
       :   <>
            <Link to="/" className="links">Back to Products</Link>
        <div className="row top">
            <div className="col-2">
               <img className="large" src={product.image} alt={product.name}/>
            </div>
            <div className="col-1">
                <ul>
                    <li className="productTitle">{product.name}</li>
                    <li><Rating rating={product.rating} numReviews={product.numReviews}/></li>
                    <li><i className="fa fa-inr"></i> {product.price}</li>
                </ul>
                
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            Seller
                            <h2>
                                <Link to={`/seller/${product.seller._id}`}>
                                    {product.seller.seller.name}
                                </Link>
                            </h2>
                            <Rating rating={product.seller.seller.rating} 
                            numReviews={product.seller.seller.numReviews}
                            />
                        </li>
                        <li>
                            <div className="row">
                                <div>Price</div>
                                <div className="price" ><i className="fa fa-inr"></i>{product.price}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Status</div>
                                <div>
                                    {product.countInStock>0? 
                                    <span className="success">  In Stock</span> 
                                    :
                                    <span className="error">Out of Stock</span>
                                }
                                </div>
                            </div>
                        </li>
                        {
                            product.countInStock> 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div className="label>">
                                            Qty
                                        </div>
                                        <div >
                                            <select value={qty} onChange={e=>setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x=>
                                                        (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li><button onClick={addToCartHandler} className="primary block">Add to Cart</button></li>    
                                </>
                            )
                        }
                      
                    </ul>
                </div>
                
            </div>
        </div>
        </>
       }
        </div>
       
    )
}

export default ProductView
