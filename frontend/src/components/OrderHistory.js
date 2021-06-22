import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myOrderList } from '../actions/orderActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';

const OrderHistory = (props) => {

    const myorderList =useSelector(state=>state.myOrderList);
    const {loading, error, orders} = myorderList;
     const dispatch = useDispatch();
     useEffect(()=>
     {
         dispatch(myOrderList());
     },[dispatch]);

    return (
        <div className="order-history">
            <h1>Order History</h1>
            {loading ?<LoadingBox></LoadingBox> :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERD</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? "yes": "No"}</td>
                                <td>{order.isDelivered?"yes": "No"}</td>
                                <td>
                                    <button type="button" className="primary small"
                                    onClick={()=>props.history.push(`/order/${order._id}`)}>
                                          Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
 
                </table>
            )

        }  
        </div>
    )
    
}

export default OrderHistory;
