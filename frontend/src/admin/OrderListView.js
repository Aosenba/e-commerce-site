import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';

const OrderListView = (props) => {

    const sellerMode = props.match.path.indexOf('/seller')>=0;
    const orderList =useSelector(state=>state.orderList);
    const {loading,error,orders} = orderList;
    const orderDelete = useSelector(state=>state.orderDelete);
    const {loading:loadingDelete, error:errorDelete,success:successDelete} = orderDelete;
    const userSignin =useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
    console.log(orders)
    const deleteHandler =(orderId)=>
    {
        if(window.confirm("Are you sure you want to delete"))
        {
            dispatch(deleteOrder(orderId));
        }
    }

    const dispatch = useDispatch();
    useEffect(()=>
    {
        dispatch(listOrders({seller :sellerMode?userInfo._id :''}));
        dispatch({type:ORDER_DELETE_RESET});
    },[dispatch,successDelete,sellerMode,userInfo]);
    
    return (
        <div className="order-history">
        <h1>Orders</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}    
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {loading ?<LoadingBox></LoadingBox> : 
        error ? <MessageBox variant="danger">{error}</MessageBox> 
        :
        (
            <table className="table">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    orders.length === 0 ? (
                        <tr><td><MessageBox variant="danger">No orders</MessageBox></td></tr>
                    )
                    :
                    orders.map((order,idx)=>(
                        <tr key={order._id}>
                            <td>{idx+1}</td>
                            <td>{order.user.name}</td>
                            <td>{order.createdAt.slice(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid? "yes": "No"}</td>
                            <td>{order.isDelivered?"yes": "No"}</td>
                            <td>
                                <button type="button" className="primary small"
                                onClick={()=>props.history.push(`/order/${order._id}`)}>
                                      Details
                                </button>
                                <button type="button" className="primary small"
                                onClick={()=>deleteHandler(order._id)}>Delete</button>
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

export default OrderListView
