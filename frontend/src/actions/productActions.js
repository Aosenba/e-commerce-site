import Axios from "axios";
import {CREATE_REVIEW_FAILED, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, PRODUCT_CATEGORY_LIST_FAILED,
     PRODUCT_CATEGORY_LIST_REQUEST, 
     PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAILED,
      PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, 
      PRODUCT_DELETE_FAILED, PRODUCT_DELETE_REQUEST, 
      PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAILED,
     PRODUCT_DETAILS_REQUEST,
      PRODUCT_DETAILS_SUCCESS,
       PRODUCT_LIST_FAILED, 
       PRODUCT_LIST_REQUEST, 
       PRODUCT_LIST_SUCCESS, 
       PRODUCT_UPDATE_FAILED, 
       PRODUCT_UPDATE_REQUEST,
       PRODUCT_UPDATE_SUCCESS} from "../constants/productConstants"

export const listProducts =({seller='',name='',category='',min=0,max=0,rating=0,order='',pageNumber=""})=> async(dispatch)=>{
    dispatch({
         type: PRODUCT_LIST_REQUEST
    });

    try {
    
 const {data}= 
 await Axios.get(`/api/products?pageNumber=${pageNumber}&seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
       dispatch({type:PRODUCT_LIST_SUCCESS ,  payload : data});
        
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
       dispatch({type:PRODUCT_LIST_FAILED,payload :message});
    }
};



export const detailsProduct = (productId) => async(dispatch) =>{
    dispatch ({type:PRODUCT_DETAILS_REQUEST, payload:productId});

    try { 
        const {data}= await Axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload:data});
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type:PRODUCT_DETAILS_FAILED,
            payload : message}
        );
    }
};

export const createProduct =()=>async(dispatch,getState)=>{
    dispatch({type:PRODUCT_CREATE_REQUEST});
    const {userSignin:{userInfo}} =getState();
    try {
     const {data} = await Axios.post('/api/products',{},{
         headers:{
             Authorization :  `Bearer ${userInfo.token}`
         }
     });
     dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data.product });
        
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type:PRODUCT_CREATE_FAILED,
            payload :message
      
        });
        
    }
};

export const updateProduct =(product)=>async(dispatch,getState)=>{
    dispatch({type:PRODUCT_UPDATE_REQUEST,payload:product});
    const {userSignin:{userInfo}}=getState();
    try {
        const {data}= await Axios.put(`/api/products/${product._id}`,product,{
            headers :{
                Authorization :`Bearer ${userInfo.token}`
            }
        });
        dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data});
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type:PRODUCT_UPDATE_FAILED,
           error:message
        });
    }
};

export const deleteProduct =(productId)=>async(dispatch,getState)=>
{
    dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId});
    const {userSignin:{userInfo}}= getState();
    try {
            const {data} = await Axios.delete(`/api/products/${productId}`,{
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            });
            dispatch({type:PRODUCT_DELETE_SUCCESS ,product:data});
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type:PRODUCT_DELETE_FAILED,
           error:message
        });
    }
};

export const listProductCategories=()=> async(dispatch)=>{
    dispatch({
         type: PRODUCT_CATEGORY_LIST_REQUEST
    });

    try {
    
        const {data}= await Axios.get(`/api/products/categories`);
       dispatch({type:PRODUCT_CATEGORY_LIST_SUCCESS,  payload : data});
        
    } catch (error) {
        const message =error.response && error.response.data.message?
        error.response.data.message : error.message;
       dispatch({type:PRODUCT_CATEGORY_LIST_FAILED,payload :message});
    }
};


export const createReview =(productId,review)=>async(dispatch,getState)=>{
    dispatch({type:CREATE_REVIEW_REQUEST});
    const {userSignin:{userInfo}} =getState();
    try {
     const {data} = await Axios.post(`/api/products/${productId}/reviews`,review,{
         headers:{
             Authorization :  `Bearer ${userInfo.token}`
         }
     });
     dispatch({type:CREATE_REVIEW_SUCCESS,payload:data.review });
        
    } catch (error) {
        const message =error.response && error.response.data.message?
                        error.response.data.message : error.message;
        dispatch({type:CREATE_REVIEW_FAILED,
           payload:message
        });
        
    }
};