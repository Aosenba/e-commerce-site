
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../Home/MessageBox';

const CartView = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const [cartWarning, setcartWarning] = useState(false);
    const cart= useSelector(state=>state.cart);
    const {cartItems}=cart;


    useEffect(()=>{
        if(productId)
        {
            dispatch(addToCart(productId,qty));
        }
    },[dispatch,productId,qty]);

    const removeFromCartHandler= (id)=>
    {
        dispatch(removeFromCart(id));

    }

    const checkOutHandler=()=>
    {
      if(cartItems.length===0)
      {
          setcartWarning(true);
          setTimeout(() => {
            setcartWarning(false);
          }, 2000);
      }
      else{
        props.history.push('/signin?redirect=shipping');
      }
           
    
    };
  
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping cart</h1>
                {
                    cartItems.length===0? 
                    <MessageBox>Cart is Empty{' '}
                     <Link  to="/">Go to Home</Link>
                    </MessageBox>
                    :
                    (
                        <ul>
                           {
                               cartItems.map((item)=>
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
                                               <select 
                                               value={item.qty} 
                                               onChange={(e)=>
                                               dispatch(addToCart(item.product, Number(e.target.value)
                                              ))
                                               }>
                                                    {
                                                    [...Array(item.countInStock).keys()].map(x=>
                                                        (
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))
                                                }
                                               </select>
                                              
                                           </div>
                                           <div>
                                           <i className="fa fa-inr"></i>  {item.price}
                                           </div>
                                           <div>
                                               <button className="deleteBtn" type="button"
                                                onClick={()=>removeFromCartHandler(item.product)}>
                                                    Delete
                                                </button>
                                           </div>
                                       
                                       </div>
                                   </li>
                               ))
                           }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li><h2>
                            Sub Total 
                             ({cartItems.reduce((sum, item) => sum +item.qty,0)} items) 
                             : <i className="fa fa-inr"></i> 
                             {cartItems.reduce((sum,item)=>sum + item.price * item.qty,0)}
                             </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkOutHandler} className="primary block" 
                               >
                                   Proceed to CheckOut
                               </button>
                        </li>
                        <li>
                        {
                                               cartWarning && 
                                               (
                                                   <MessageBox variant="danger">
                                                       Your cart is empty!!
                                                       please add some items
                                                   </MessageBox>
                                               )
                                           }
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default CartView
