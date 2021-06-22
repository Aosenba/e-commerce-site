import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOut from './CheckOut'

const Payment = (props) => {

    const cart = useSelector((state)=>state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress.address)
    {
        props.history.push('/shipping');
    }

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('DebitCard');

    const submitHandler =(e)=>
    {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckOut step1 step2 step3></CheckOut>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Payment Method</h2>
                </div>
                <div >
                     <div className="radio-group">
                         <input type="radio" id="DebitCard" value="DebitCard" name="paymentMethod" required checked 
                         onChange={e=>setPaymentMethod(e.target.value)}></input>
                         <label htmlFor="DebitCard">Debit Card</label>
                     </div>
                </div>
                <div >
                     <div className="radio-group">
                         <input type="radio" id="UPI" value="UPI" name="paymentMethod" required  
                         onChange={e=>setPaymentMethod(e.target.value)}></input>
                         <label htmlFor="UPI">UPI</label>
                     </div>
                </div>
                <div >
                     <div className="radio-group">
                         <input type="radio" id="COD" value="COD" name="paymentMethod" required  
                         onChange={e=>setPaymentMethod(e.target.value)}></input>
                         <label htmlFor="COD">COD(Cash on delivery)</label>
                     </div>
                </div>
            
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
            
        </div>
    )
}

export default Payment
