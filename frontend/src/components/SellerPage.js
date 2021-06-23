import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import Rating from './Rating';
import Product from './Product';

const SellerPage = (props) => {
    const sellerId = props.match.params.id;
    const dispatch = useDispatch();
    const userDetails = useSelector((state)=>state.userDetails);
    const {loading,error,user} = userDetails;

    const productList = useSelector((state)=>state.productList);
    const {loading:loadingProducts,error:errorProducts,products} = productList;

    useEffect(()=>{
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({seller:sellerId}));
    },[dispatch,sellerId]);

    return (
        <div className="row top">
            <div className="col-1">
                {loading?<LoadingBox/> 
                :
               error? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <ul className="card card-body">
                        <li>
                            <div className="row start">
                                <div className="p-1">
                                    <img className="small" src={user.seller.logo} alt={user.seller.name}/>
                                </div>
                                <div className="p-1"> 
                                    <h2>{user.seller.name}</h2>
                                </div>
                            </div>
                        </li>
                        <li>
                           <Rating value={user.seller.rating} text={`${user.seller.numReviews} reviews`}></Rating>
                        </li>
                        <li>
                            <a href={`mailto:${user.seller.email}`}>Contact Seller</a>
                        </li>
                        <li>
                            {user.seller.description}
                        </li>
                    </ul>
                )
            }
            </div>
            <div className="col-3">
            {loadingProducts?<LoadingBox/> 
                :
               errorProducts? <MessageBox variant="danger">{errorProducts}</MessageBox>
                :
                (
                
                    <>{products.length === 0 && <MessageBox variant="danger">No products found</MessageBox>}
                    <div className="row center">
                    {
                                products.map((product=>(
                                <Product key={product._id} product={product}/>
                                )
                                ))
                            } 
                    </div>
                    </>
                )
               }
            </div>
            
        </div>
    )
}

export default SellerPage
