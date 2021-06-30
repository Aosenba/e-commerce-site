
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import GpayButton from './GpayButton';

const OrderReview = (props) => {
   const orderId = props.match.params.id;

   const deliverHandler =()=>
   {
    dispatch(deliverOrder(order._id));
   }
   
    const dispatch = useDispatch();
    const orderDetails = useSelector(state=>state.orderDetails);
    const {order,loading,error}=orderDetails;
    const orderPay = useSelector(state=>state.orderPay);
    const { success:successPay } = orderPay;
    const orderDeliver = useSelector(state=>state.orderDeliver);
    const {loading:loadingDeliver,error:errorDeliver,success:successDeliver } = orderDeliver;
    const userSignin= useSelector(state=>state.userSignin);
    const {userInfo}=userSignin; 
    useEffect(()=>{
        if(!order ||successPay ||successDeliver ||(order && order._id !==orderId))
        {
            dispatch({type:ORDER_PAY_RESET});
            dispatch({type:ORDER_DELIVER_RESET});
            dispatch(detailsOrder(orderId)); 
        }
      else{

      
      }
    },[dispatch,orderId,successDeliver,successPay,order] 
    );



 
    return loading?(<LoadingBox></LoadingBox>) :
    error? (<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div>
           <MessageBox variant="success">
             <p> please Complete the order.</p> 
              Order Id: {order._id}
           
           </MessageBox>
              <div className="row top">
                  <div className="col-2">
                      <ul>
                          <li>
                              <div className="card card-body">
                                  <h3>
                                      Shipping
                                  </h3>
                                  <p><strong>Name: </strong>{order.shippingAddress.fullName}</p>
                                  <p><strong>Address: </strong>{order.shippingAddress.address} ,
                                   {order.shippingAddress.state} , {order.shippingAddress.pincode}</p>
                                  <p><strong>City: </strong>{order.shippingAddress.city }</p>
                                  {order.isDelivered ?
                                  <MessageBox variant="success"> Delivered at {order.deliveredAt}</MessageBox>
                                  :
                                  <MessageBox variant="danger">Not delivered</MessageBox>
                                }

                              </div>
                          </li>
                          <li>
                              <div className="card card-body">
                                  <h3>
                                      Payment
                                  </h3>
                                  <p><strong>Method: </strong>{order.paymentMethod}</p>
                                  {order.isPaid ?
                                  <MessageBox variant="success"> Paid at {order.paidAt}</MessageBox>
                                  :
                                  <MessageBox variant="danger">Not Paid</MessageBox>
                                }

                              </div>
                          </li>
                          <li>
                              <div className="card card-body">
                                 <h3>Order Items</h3>
                                 <ul>
                           {
                               order.orderItems.map((item)=>
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
                                      <div> <i className="fa fa-inr"></i> {order.itemsPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Shipping</div>
                                      <div> <i className="fa fa-inr"></i> {order.shippingPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div>Tax </div>
                                      <div> <i className="fa fa-inr"></i> {order.taxPrice}</div>
                                  </div>
                              </li>
                              <li>
                                  <div className="row">
                                      <div><strong>Total </strong> </div>
                                      <div><strong> <i className="fa fa-inr"></i> {order.totalPrice}</strong> </div>
                                  </div>
                              </li>
                              {loadingDeliver && <LoadingBox></LoadingBox>}
                              {errorDeliver && <MessageBox varaint="danger">{errorDeliver}</MessageBox>}
                              {
                                  (order.paymentMethod==="DebitCard" || order.paymentMethod==="UPI" )
                                  &&
                                  <div className="gpay">
                                      {!order.isPaid &&    
                                      <GpayButton totalPrice={order.totalPrice}
                                     order={order}/>}
                                    </div>
                              }
                            {
                                userInfo.isAdmin && !order.isDelivered && (
                                    <li>
                                        <button type="button" className="primary block"
                                        onClick={deliverHandler}
                                        >Deliver</button>
                                    </li>
                                )
                            }
                             
                              
                            
                              {loading && <LoadingBox></LoadingBox>}
                              {error && <MessageBox variant ="danger">{error}</MessageBox>}
                          </ul>
                         
                      </div>

                  </div>
              </div>
            
        </div>
    )
}

export default OrderReview;
