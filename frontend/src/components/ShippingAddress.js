import React, { useState } from 'react';
import CheckOut from './CheckOut';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingAddress = (props) => {
    const userSignin = useSelector((state)=>state.userSignin);
    const {userInfo} = userSignin;
    const cart= useSelector((state)=>state.cart); 
    const {shippingAddress}=cart;    
 
    if(!userInfo)
    {
        props.history.push('/signin'); 
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [state, setState] = useState(shippingAddress.state);
    const [pincode, setPincode] = useState(shippingAddress.pincode);

    const dispatch = useDispatch();
    const submitHandler =(e)=>
    {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName,address,city,state,pincode}));
        props.history.push('/paymentmethod');


    }
    return (
        <div>
            <CheckOut step1 step2></CheckOut>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h3>Shipping Address</h3>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" 
                    placeholder=" Enter full Name" 
                     value={fullName}
                     onChange={(e)=>setFullName(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" 
                    placeholder=" Enter Address" 
                     value={address}
                     onChange={(e)=>setAddress(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" 
                    placeholder=" Enter City" 
                     value={city}
                     onChange={(e)=>setCity(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" 
                    placeholder=" Enter State" 
                     value={state}
                     onChange={(e)=>setState(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="pincode">Pin Code</label>
                    <input type="text" id="pincode" 
                    placeholder=" Enter Pincode" 
                     value={pincode}
                     onChange={(e)=>setPincode(e.target.value)} required/>
                </div>
                <div>
                   <label/>
                   <button className="primary" type="submit">
                       Continue
                   </button>
                </div>

            </form>
            
        </div>
    )
}

export default ShippingAddress;
