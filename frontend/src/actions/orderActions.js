import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { CREATE_ORDER_FAILED, 
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAILED,
     ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_REQUEST,
    ORDER_PAY_FAILED,ORDER_PAY_SUCCESS, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_FAILED, MY_ORDER_LIST_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_FAILED, ORDER_LIST_SUCCESS, ORDER_DELETE_REQUEST, ORDER_DELETE_FAILED, ORDER_DELETE_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAILED, ORDER_SUMMARY_REQUEST, ORDER_SUMMARY_FAILED, ORDER_SUMMARY_SUCCESS } from "../constants/orderConstants"

export const createOrder =(order)=>async(dispatch,getState)=>
{
   dispatch({type:CREATE_ORDER_REQUEST,payload :order});
   
   try {
       const {userSignin:{userInfo}}=getState();
    
      
       const {data}= await Axios.post('/api/orders',order,{
           headers :{
               Authorization :`Bearer ${userInfo.token}`,
           },
       });
       dispatch({type:CREATE_ORDER_SUCCESS, payload:data.order});
       dispatch({type : CART_EMPTY});
       localStorage.removeItem('cartItems');
   } catch (error) {
       dispatch({type:CREATE_ORDER_FAILED,
        payload: error.response && error.response.data.message ?
        error.response.data.message : error.message
    
    });
   }
};

export const detailsOrder =(orderId) =>async(dispatch,getState)=>
{
    dispatch({type:ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin :{ userInfo}} = getState();
    try {
        const {data} = await Axios.get(`/api/orders/${orderId}`,{
            headers :{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload:data});
        
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type :ORDER_DETAILS_FAILED, payload :message});
        
    }
};

export const payOrder =(order, paymentResult)=>async(dispatch,getState)=>
{
    dispatch({type:ORDER_PAY_REQUEST,payload :{order,paymentResult}});
    const {userSignin :{userInfo},}  = getState();
    try {
        const {data} =  Axios.put(`/api/orders/${order._id}/pay`,paymentResult,
        {
            headers  : {
                Authorization : `Bearer ${userInfo.token}`
            }
        });
      
        dispatch({type:ORDER_PAY_SUCCESS,payload: data});
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type :ORDER_PAY_FAILED, payload :message});
    }
}; 

export const myOrderList =()=> async(dispatch,getState) =>{
    dispatch({type:MY_ORDER_LIST_REQUEST});
    const {userSignin:{userInfo}} = getState();
    try {
        const {data} = await Axios.get('/api/orders/mine',{
            headers :{
                Authorization : `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:MY_ORDER_LIST_SUCCESS,payload:data});
        
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type:MY_ORDER_LIST_FAILED,payload:message})
    }
};

export const listOrders=({seller=''})=>async(dispatch,getState)=>
{
    dispatch({type:ORDER_LIST_REQUEST});
    const {userSignin:{userInfo}}= getState();
    try {
        const {data} = await Axios.get(`/api/orders?seller=${seller}`,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        });
        dispatch({type:ORDER_LIST_SUCCESS,payload:data});
        
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type:ORDER_LIST_FAILED,payload:message})
    }
};

export const deleteOrder=(orderId)=>async(dispatch,getState)=>
{
    dispatch({type:ORDER_DELETE_REQUEST,payload:orderId});
    const {userSignin:{userInfo}}= getState();
    try {
        const {data} = await Axios.delete(`/api/orders/${orderId}`,
        {
            headers:{
                Authorization : `Bearer ${userInfo.token}`
            }
        });
        dispatch({type:ORDER_DELETE_SUCCESS,payload:data});
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type:ORDER_DELETE_FAILED,payload:message})
    }
    
};

export const deliverOrder =(orderId)=>async(dispatch,getState)=>
{
    dispatch({type:ORDER_DELIVER_REQUEST,payload :orderId});
    const {userSignin :{userInfo},}  = getState();
    try {
        const {data} =  Axios.put(`/api/orders/${orderId}/deliver`,{},
        {
            headers  : {
                Authorization : `Bearer ${userInfo.token}`
            }
        });
      
        dispatch({type:ORDER_DELIVER_SUCCESS,payload: data});
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type :ORDER_DELIVER_FAILED, payload :message});
    }
}; 

export const summaryOrder =()=>async(dispatch,getState)=>
{
    dispatch({type:ORDER_SUMMARY_REQUEST});
    const {userSignin :{userInfo},}  = getState();
    try {
        const {data} =await  Axios.get(`/api/orders/summary`,
        {
            headers  : {
                Authorization : `Bearer ${userInfo.token}`
            }
        });
      
        dispatch({type:ORDER_SUMMARY_SUCCESS,payload:data});
        
    } catch (error) {
        const message =error.response && error.response.data.message ?
        error.response.data.message : error.message;
        dispatch({type :ORDER_SUMMARY_FAILED, payload :message});
    }
};