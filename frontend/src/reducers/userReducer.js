
import { PROFILE_UPDATE_FAILED, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_RESET, PROFILE_UPDATE_SUCCESS, TOPSELLERS_LIST_FAILED, TOPSELLERS_LIST_REQUEST, TOPSELLERS_LIST_SUCCESS, USER_DELETE_FAILED, USER_DELETE_REQUEST, USER_DELETE_RESET, USER_DELETE_SUCCESS, USER_DETAILS_FALIED, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_REGISTER_FALIED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FALIED, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS, USER_UPDATE_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userSigninReducer =(state ={},action)=>
{
    switch(action.type)
    {
        case USER_SIGNIN_REQUEST:
            return {loading :true};
        case USER_SIGNIN_SUCCESS:
            return {loading :false, userInfo:action.payload};
        case USER_SIGNIN_FALIED:
            return {loading : false, error:action.payload};
        case USER_SIGNIN_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer =(state ={},action)=>
{
    switch(action.type)
    {
        case USER_REGISTER_REQUEST:
            return {loading :true};
        case USER_REGISTER_SUCCESS:
            return {loading :false, userInfo : action.payload};
        case USER_REGISTER_FALIED:
            return {loading : false, error:action.payload};
        default:
            return state;
    }
}; 

export const userDetailsReducer =(state = {loading:true},action) =>
{
    switch(action.type)
    {
        case USER_DETAILS_REQUEST:
            return{loading:true};
        case USER_DETAILS_SUCCESS:
            return{loading:false,user:action.payload};
        case USER_DETAILS_FALIED:
            return{loading:false, error:action.payload};
        case USER_DETAILS_RESET:
            return {loading:true};
        default:
            return state;
    }
};
export const profileUpdateReducer =( state ={},action )=>
{
    switch(action.type){
        case PROFILE_UPDATE_REQUEST:
            return {loading:true};
        case PROFILE_UPDATE_SUCCESS:
            return{loading:false, success:true};
        case PROFILE_UPDATE_FAILED:
            return{loading:false,error:action.payload};
        case PROFILE_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userListReducer =(state={loading:true},action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return {loading:true};
        case USER_LIST_SUCCESS:
            return {loading:false, users:action.payload};
        case USER_LIST_FAILED:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
};

export const userDeleteReducer =(state={},action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading:true};
        case USER_DELETE_SUCCESS:
            return {loading:false,success:true};
        case USER_DELETE_FAILED:
            return {loading:false,error:action.payload};
        case USER_DELETE_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateReducer =( state ={},action )=>
{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading:true};
        case USER_UPDATE_SUCCESS:
            return{loading:false, success:true};
        case USER_UPDATE_FAILED:
            return{loading:false,error:action.payload};
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const topSellersListReducer =(state={loading:true},action)=>{
    switch(action.type){
        case TOPSELLERS_LIST_REQUEST:
            return {loading:true};
        case TOPSELLERS_LIST_SUCCESS:
            return {loading:false, topSellers:action.payload};
        case TOPSELLERS_LIST_FAILED:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
};