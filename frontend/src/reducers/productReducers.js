import { CREATE_REVIEW_FAILED, CREATE_REVIEW_REQUEST, CREATE_REVIEW_RESET, CREATE_REVIEW_SUCCESS, PRODUCT_CATEGORY_LIST_FAILED, PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CREATE_FAILED, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAILED, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

export const productListReducers = (state = {loading:true, products :[]}, action) =>{
    switch(action.type)
    {
        case PRODUCT_LIST_REQUEST:
            return {loading:true};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products :action.payload};
        case PRODUCT_LIST_FAILED:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const productDetailsReducers = (state = {loading:true}, action) =>{
    switch(action.type)
    {
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product : action.payload};
        case PRODUCT_DETAILS_FAILED:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const productCreateReducer =(state={},action)=>{
    switch(action.type)
    {
        case PRODUCT_CREATE_REQUEST:
            return {loading:true};
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false,success:true, product:action.payload};
        case PRODUCT_CREATE_FAILED:
            return {loading:false, error:action.payload};
        case PRODUCT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productUpdateReducer =(state={},action) =>{
    switch(action.type)
    {
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true};
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false ,success:true};
        case PRODUCT_UPDATE_FAILED:
            return {loading:false,error:action.payload};
        case PRODUCT_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const productsDeleteReducer =(state={},action)=>
{
    switch(action.type)
    {
        case PRODUCT_DELETE_REQUEST:
            return {loading:true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true};
        case PRODUCT_DELETE_FAILED:
            return {loading:false,error:action.payload};
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
        
    }
};

export const productCategoryListReducers = (state = {loading:true, products :[]}, action) =>{
    switch(action.type)
    {
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return {loading:true};
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return {loading:false,categories:action.payload};
        case PRODUCT_CATEGORY_LIST_FAILED:
            return {loading:false, error:action.payload};
        default:
            return state;
    }
};

export const productReviewCreateReducer =(state={},action)=>{
    switch(action.type)
    {
        case CREATE_REVIEW_REQUEST:
            return {loading:true};
        case CREATE_REVIEW_SUCCESS:
            return {loading:false,success:true, review:action.payload};
        case CREATE_REVIEW_FAILED:
            return {loading:false, error:action.payload};
        case CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
};