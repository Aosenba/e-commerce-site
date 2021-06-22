import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { CREATE_ORDER_RESET } from '../constants/orderConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import CheckOut from './CheckOut'

const PlaceOrderView = (props) => {

   
    const cart =useSelector(state=>state.cart);
    const orderCreate = useSelector(state=>state.orderCreate);
    const {loading, success, error, order}=orderCreate;
    if(!cart.paymentMethod)
    {
        props.history.push('payment');
    }
    
    const toPrice=(num)=>Number(num.toFixed(2)); 
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a,c)=>a + c.qty * c.price,0));

    cart.shippingPrice = cart.itemsPrice<100 ? toPrice(0) : toPrice(50);
    cart.taxPrice =  toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice=cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    
    const placeOrderHandler =() =>
    {
        dispatch(createOrder({...cart, orderItems : cart.cartItems}));
    };
    
    useEffect(()=>{
        if(success)
        {
                props.history.push(`/order/${order._id}`);
                dispatch({type:CREATE_ORDER_RESET});
        }

    },[dispatch,order,props.history,success]
    );

    return (
        <div>
              <CheckOut step1 step2 step3 step4></CheckOut>
              <div className="row top">
                  <div className="col-2">
                      <ul>
                          <li>
                              <div className="card card-body">
                                  <h3>
                                      Shipping
                                  </h3>
                                  <p><strong>Name: </strong>{cart.shippingAddress.fullName}</p>
                                  <p><strong>Address: </strong>{cart.shippingAddress.address} ,
                                   {cart.shippingAddress.state} , {cart.shippingAddress.pincode}</p>
                                  <p><strong>City: </strong>{cart.shippingAddress.city }</p>

                              </div>
                          </li>
                          <li>
                              <div className="card card-body">
                                  <h3>
                                      Payment
                                  </h3>
                                  <p><strong>Method: </strong>{cart.paymentMethod}</p>
                               

                              </div>
                          </li>
                          <li>
                              <div className="card card-body">
                                 <h3>Order Items</h3>
                                 <ul>
                           {
                               cart.cartItems.map((item)=>
                               (
                                   <li key={item.product}>
                                       <div className="row">
                                           <div>
                                               <img className="small" src={item.image} alt={item.name}/>
                                           </div>
                                           <div className="min-30">
                                               <Link to={`product/${item.product}`}>
                                                  {item.name}
                                               </Link>
                                           </div>

                                           <div>
                                         {item.qty}  {' '} x {' '}  <i className="fa fa-inr"></i>{item.price} 
                                         = {item.price * item.qty}
                                           </div>
                                        
                                       </div>
                                   </li>
                               ))
                           }
                        </ul>

                              </div>
                          </li>
                      </ul>

                  </div>
                  <div className="col-1">
                      <div className="card card-body">
                          <ul>
                              <li>
                                  <h2>Order Summary</h2>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Items</div>
                                      <div> <i className="fa fa-inr"></i> {cart.itemsPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Shipping</div>
                                      <div> <i className="fa fa-inr"></i> {cart.shippingPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Tax </div>
                                      <div> <i className="fa fa-inr"></i> {cart.taxPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div><strong>Total </strong> </div>
                                      <div><strong> <i className="fa fa-inr"></i> {cart.totalPrice}</strong> </div>
                                  </div>
                              </li>
                              <li>
                                  <button type="button" onClick={placeOrderHandler}
                                   className="primary block"
                                   disabled={cart.cartItems.length === 0}>
                                      Place Order
                                  </button>
                              </li>
                              {loading && <LoadingBox></LoadingBox>}
                              {error && <MessageBox variant ="danger">{error}</MessageBox>}
                          </ul>
                      </div>

                  </div>
              </div>
            
        </div>
    )
}

export default PlaceOrderView
