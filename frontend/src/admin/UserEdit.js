import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import LoadingBox from '../Home/LoadingBox'
import MessageBox from '../Home/MessageBox'

const UserEdit = (props) => {
    const dispatch = useDispatch();
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const userDetails = useSelector(state=>state.userDetails);
    const {loading,error,user}=userDetails;

    const userUpdate = useSelector(state=>state.userUpdate);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate;

    useEffect(()=>{
        if(successUpdate)
        {
            dispatch({type:USER_UPDATE_RESET});
            props.history.push('/userlist');
        }
        if(!user){
            dispatch(detailsUser(userId));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    },[dispatch,user,userId,successUpdate,props.history ])

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(updateUser({_id:userId, name,email,isSeller,isAdmin}));
    }
    return (
        <div>
            <form className="form"  onSubmit={submitHandler}>
                <div>
                <h1>Edit User {name}</h1>
                {loadingUpdate && <LoadingBox/>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {}
                </div>
               {loading ? <LoadingBox/> :
               error ? <MessageBox variant="danger">{error}</MessageBox>
               :
               <>
               <div>
                   <label htmlFor="name">Name</label>
                   <input id="name" type="text" placeholder="Enter name" value={name}
                   onChange={(e)=>setName(e.target.value)}
                   ></input>
               </div>
               <div>
                   <label htmlFor="email">Email</label>
                   <input id="email" type="email" placeholder="Enter email" value={email}
                   onChange={(e)=>setEmail(e.target.value)}
                   ></input>
               </div>
               <div>
                   <label htmlFor="isSeller">Is Seller?</label>
                   <input id="isSeller" type="checkbox" checked={isSeller}
                   onChange={(e)=>setIsSeller(e.target.checked)}
                   ></input>
               </div>
               <div>
                   <label htmlFor="isAdmin">Is Admin?</label>
                   <input id="isAdmin" type="checkbox" checked={isAdmin}
                   onChange={(e)=>setIsAdmin(e.target.checked)}
                   
                   ></input>
               </div>
               <button type="submit" className="primary">Update</button>
               </>
               }
            </form>
            
        </div>
    )
}

export default UserEdit
