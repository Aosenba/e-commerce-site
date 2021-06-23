import {compose, createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { myOrderListReducer, orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';
import { productCreateReducer, productDetailsReducers, productListReducers, productsDeleteReducer, productUpdateReducer } from './reducers/productReducers';
import { profileUpdateReducer, topSellersListReducer, userDeleteReducer, userDetailsReducer, userListReducer, userRegisterReducer, userSigninReducer, userUpdateReducer } from './reducers/userReducer';

const initialState = {
    userSignin : {
       userInfo : localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo'))
       :
       null
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems'))
        :
        [],
        shippingAddress : localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) :{},
        paymentMethod : localStorage.getItem('paymentMethod') ?
        JSON.parse(localStorage.getItem('paymentMethod')) : {},
    
    }
   
};
 
const reducer = combineReducers({
    productList:productListReducers,
    productDetails : productDetailsReducers,
    cart : cartReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    orderCreate : orderCreateReducer,
    orderDetails :orderDetailsReducer,
    orderPay : orderPayReducer,
    myOrderList : myOrderListReducer,
    userDetails : userDetailsReducer,
    updateProfile :profileUpdateReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productDelete:productsDeleteReducer,
    orderList : orderListReducer,
    orderDelete :orderDeleteReducer,
    orderDeliver:orderDeliverReducer,
    topSellersList : topSellersListReducer
});
 
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;