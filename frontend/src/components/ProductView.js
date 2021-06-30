import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { CREATE_REVIEW_RESET } from '../constants/productConstants';
const ProductView = (props) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [qty, setQty]= useState(1);
    const dispatch = useDispatch();
    const productId= props.match.params.id;
    const {loading,error,product} =useSelector((state)=>state.productDetails);
    const createProductReview =  useSelector(state=>state.createProductReview);
    const {loading:loadingReview,error:errorReview,success:successReview}=createProductReview;
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
   console.log(comment,rating)
    const submitHandler =(e)=>
    {
        e.preventDefault();
        if(comment && rating){
            dispatch(createReview(productId,{rating,comment,name:userInfo.name}));
        }
        else{
            alert('please enter comment and rating');
        }
       
    };

    useEffect(() => {
        if(successReview){
            window.alert("Review Submitted Successfully");
            setRating('');
            setComment('');
            dispatch({type:CREATE_REVIEW_RESET});
        }
       dispatch(detailsProduct(productId));
    }, [dispatch, productId,successReview]);

    const addToCartHandler =()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }


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
        <div>
            <h3 id="reviews">{product.reviews.length}{'  '}Reviews</h3>
            {
                product.reviews.length===0 && <MessageBox variant="success">There is no Review</MessageBox>
            }
            <ul>
                {
                    product.reviews.map((review,idx)=>
                    (
                        <li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=' '></Rating>
                                <p>
                                    {review.createdAt.substring(0,10)}
                                </p>
                                <p>
                                    {review.comment}
                                </p>
                        </li>
                    ))
                }
                <li>
                    {userInfo? (
                        <form className="form" onSubmit={submitHandler}>
                            <div>
                            <h2>Write a review</h2>
                            </div>
                            <div>
                                <label htmlFor="rating">Rating</label>
                                <select id="rating" value={rating} onChange={e=>setRating(e.target.value)}>
                                    <option value="">Select...</option>
                                    <option value="1">1-Poor</option>
                                    <option value="2">2-Fair</option>
                                    <option value="3">3-Good</option>
                                    <option value="4">4-Very Good</option>
                                    <option value="5">5-Excellent</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="comment">Comment</label>
                                <textarea id="comment" value={comment} onChange={e=>setComment(e.target.value)}></textarea>
                            </div>
                            <div>
                                <label/>
                                <button type="submit" className="primary">Submit</button>
                            </div>
                            <div>
                            {loadingReview && <LoadingBox></LoadingBox>}
                            {errorReview && <MessageBox variant="danger">{errorReview}</MessageBox>}
                            </div>
                        </form>

                    ):(
                        <MessageBox >Please <Link to="/signin">Sign in</Link></MessageBox>

                    )}
                </li>
            </ul>
        </div>
        </>
       }
        </div>
       
    )
}

export default ProductView
