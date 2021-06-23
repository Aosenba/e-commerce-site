import Axios from "axios";
import { PROFILE_UPDATE_FAILED, PROFILE_UPDATE_REQUEST,
     PROFILE_UPDATE_SUCCESS, TOPSELLERS_LIST_FAILED, TOPSELLERS_LIST_REQUEST, TOPSELLERS_LIST_SUCCESS, USER_DELETE_FAILED, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FALIED, USER_DETAILS_REQUEST, 
     USER_DETAILS_SUCCESS, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FALIED, USER_REGISTER_REQUEST, 
     USER_REGISTER_SUCCESS, USER_SIGNIN_FALIED, USER_SIGNIN_REQUEST,
      USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS, USER_UPDATE_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const signin =(email, password) =>async(dispatch)=>
{
    dispatch({type : USER_SIGNIN_REQUEST,payload :{email, password}});

    try {
        const {data} = await Axios.post('/api/users/signin', {email, password});
        dispatch({type :USER_SIGNIN_SUCCESS, payload : data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    } catch (error) {
        
        dispatch({type: USER_SIGNIN_FALIED,
        payload : error.response.data.message
    
        });
    }
};

export const signout =()=> (dispatch)=>
{
   localStorage.removeItem('cartItems');
   localStorage.removeItem('userInfo'); 
   localStorage.removeItem('shippingAddress'); 
   dispatch({type:USER_SIGNIN_SIGNOUT,payload:null});
};

export const register =(name,email,password) =>async(dispatch)=>
{
    dispatch({type : USER_REGISTER_REQUEST,payload :{name ,email, password}});

    try {
        const {data} = await Axios.post('/api/users/register', {name,email,password});
        dispatch({type :USER_REGISTER_SUCCESS, payload : data});
        dispatch({type :USER_SIGNIN_SUCCESS, payload : data});
        localStorage.setItem("userInfo",JSON.stringify(data));
    } catch (error) {
        
        dispatch({type: USER_REGISTER_FALIED,
        payload : error.response.data.message + 'account already exists'
    
        });
    }
};

export const detailsUser =(userId) =>async(dispatch, getState)=>
{
    dispatch({type:USER_DETAILS_REQUEST, payload:userId});
    const {userSignin:{userInfo}}= getState();
    try {
        const {data} = await Axios.get(`/api/users/${userId}`,
        {
            headers :{
                Authorization : `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:USER_DETAILS_SUCCESS,payload:data});
 
     
        
    } catch (error) {
        const message =  error.response.data.message ;
        dispatch({type:USER_DETAILS_FALIED,payload:message});
      
    }
}

export const updateUserProfile =(user) =>async(dispatch,getState) =>
{
    dispatch({type:PROFILE_UPDATE_REQUEST,payload:user});
    const {userSignin:{userInfo}} =getState();
    try {
        const {data} = await Axios.put(`/api/users/profile`,user,{
            headers:{
                Authorization : `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:PROFILE_UPDATE_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem('userInfo',JSON.stringify(data));
        
    } catch (error) {
        const message =  error.response.data.message  ;
        dispatch({type:PROFILE_UPDATE_FAILED, payload:message});
    }
};

export const listUsers =()=>async(dispatch,getState)=>{
    dispatch({type:USER_LIST_REQUEST});

    try {
        const {userSignin:{userInfo}}=getState();
        const {data}= await Axios.get('/api/users',{
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        });
        dispatch({type:USER_LIST_SUCCESS,payload:data})
    } catch (error) {
        const message =  error.response.data.message  ;
        dispatch({type:USER_LIST_FAILED, payload:message})
    }
};


export const deleteUser =(userId)=>async(dispatch,getState)=>{
    dispatch({type:USER_DELETE_REQUEST,payload:userId});
    try {
        const {userSignin:{userInfo}} =getState();
        const {data}=await Axios.delete(`/api/users/${userId}`,{
            headers:{
                Authorization : `Bearer ${userInfo.token}`
            } });
            dispatch({type:USER_DELETE_SUCCESS,payload:data});
        
    } catch (error) {
        const message =  error.response.data.message  ;
        dispatch({type:USER_DELETE_FAILED, payload:message})
    }
};

export const updateUser  =(user) =>async(dispatch,getState) =>
{
    dispatch({type:USER_UPDATE_REQUEST,payload:user});
    const {userSignin:{userInfo}} =getState();
    try {
        const {data} = await Axios.put(`/api/users/${user._id}`,user,{
            headers:{
                Authorization : `Bearer ${userInfo.token}`,
            }
        });
        dispatch({type:USER_UPDATE_SUCCESS,payload:data});
   
        
    } catch (error) {
        const message =  error.response.data.message  ;
        dispatch({type:USER_UPDATE_FAILED, payload:message});
    }
};

export const listTopSellers =()=>async(dispatch)=>{
    dispatch({type:TOPSELLERS_LIST_REQUEST});

    try {
        const {data}= await Axios.get('/api/users/top-sellers');
        dispatch({type:TOPSELLERS_LIST_SUCCESS,payload:data})
    } catch (error) {
        const message =  error.response.data.message  ;
        dispatch({type:TOPSELLERS_LIST_FAILED, payload:message})
    }
};
