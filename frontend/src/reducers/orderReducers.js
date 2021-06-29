import { CREATE_ORDER_FAILED, CREATE_ORDER_REQUEST,
     CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, MY_ORDER_LIST_FAILED, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, 
     ORDER_DELETE_FAILED, 
     ORDER_DELETE_REQUEST, 
     ORDER_DELETE_RESET, 
     ORDER_DELETE_SUCCESS, 
     ORDER_DELIVER_FAILED, 
     ORDER_DELIVER_REQUEST, 
     ORDER_DELIVER_RESET, 
     ORDER_DELIVER_SUCCESS, 
     ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAILED,
     ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAILED, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_SUMMARY_FAILED, ORDER_SUMMARY_REQUEST,ORDER_SUMMARY_SUCCESS } from "../constants/orderConstants";

export const orderCreateReducer  =(state ={},action) =>
{
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return{
                loading:true
            }
        case CREATE_ORDER_SUCCESS:
            return{
                loading :false, success :true , order:action.payload
            };
        case CREATE_ORDER_FAILED:
            return{
                loading:false, error :action.payload 
            };
        case CREATE_ORDER_RESET:
            return{};
        default:
            return state;
    }
};

export const orderDetailsReducer =(state ={loading :true },action)=>
{
    switch(action.type)
    {
        case ORDER_DETAILS_REQUEST:
            return { loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {loading :false, order :action.payload};
        case ORDER_DETAILS_FAILED:
            return{ loading:false , error : action.payload};
        default :
            return state;
    }
};

export const orderPayReducer =(state={},action)=>
{
    switch(action.type)
    {
         case ORDER_PAY_REQUEST:
             return {
                 loading: true
             };
        case ORDER_PAY_SUCCESS:
            return{
                loading :false, 
                success : true
            };
        case ORDER_PAY_FAILED:
            return{
                loading : false,
                error :action.payload
            };
        case ORDER_PAY_RESET:
            return {};
        default :
            return state
    };
};

export const myOrderListReducer =(state ={orders:[]},action)=>
{
  switch(action.type)
  {
      case MY_ORDER_LIST_REQUEST:
          return {loading:true};
      case MY_ORDER_LIST_SUCCESS:
          return {loading:false, orders:action.payload};
      case MY_ORDER_LIST_FAILED:
          return{loading:false, error :action.payload};
      default:
          return state;
  }
};

export const orderListReducer =(state ={orders:[]},action)=>
{
  switch(action.type)
  {
      case ORDER_LIST_REQUEST:
          return {loading:true};
      case ORDER_LIST_SUCCESS:
          return {loading:false, orders:action.payload};
      case ORDER_LIST_FAILED:
          return{loading:false, error :action.payload};
      default:
          return state;
  }
};


export const orderDeleteReducer =(state ={},action)=>
{
  switch(action.type)
  {
      case ORDER_DELETE_REQUEST:
          return {loading:true};
      case ORDER_DELETE_SUCCESS:
          return {loading:false, success:true};
      case ORDER_DELETE_FAILED:
          return{loading:false, error :action.payload};
      case ORDER_DELETE_RESET:
          return {};
      default:
          return state;
  }
};


export const orderDeliverReducer =(state={},action)=>
{
    switch(action.type)
    {
         case ORDER_DELIVER_REQUEST:
             return {
                 loading: true
             };
        case ORDER_DELIVER_SUCCESS:
            return{
                loading :false, 
                success : true
            };
        case ORDER_DELIVER_FAILED:
            return{
                loading : false,
                error :action.payload
            };
        case ORDER_DELIVER_RESET:
            return {};
        default :
            return state
    };
};

export const orderSummaryReducer =(state ={loading:true,summary:{}},action)=>
{
  switch(action.type)
  {
      case ORDER_SUMMARY_REQUEST:
          return {loading:true};
      case ORDER_SUMMARY_SUCCESS:
          return {loading:false,summary:action.payload};
      case ORDER_SUMMARY_FAILED:
          return{loading:false, error :action.payload};
      default:
          return state;
  }
};