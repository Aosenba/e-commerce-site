import React from 'react'

const CheckOut = (props) => {
    return (
        <div className="row checkout-progress">
            <div className={props.step1? 'active':''}>Sign in</div>
            <div className={props.step2? 'active':''}>Shipping</div>
            <div className={props.step3? 'active':''}>Payment</div>
            <div className={props.step4? 'active':''}>Place Order</div>
            
        </div>
    )
}

export default CheckOut
