
import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { PROFILE_UPDATE_RESET } from '../constants/userConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
const ProfileView = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 
    const userDetails = useSelector(state=>state.userDetails);
    const {user,loading,error}= userDetails;
    const updateProfile = useSelector(state=>state.updateProfile);
    const {error:updateError,success:updateSuccess,loading:updateLoading} = updateProfile;
  
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!user)
        {
            dispatch({type:PROFILE_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
        }
      

    },[dispatch,userInfo._id,user]);

    const onSubmitHandler =(e)=>
    {
        e.preventDefault();
       if(password!==confirmPassword)
       {
           alert("passwords do not match")
       }
       else{
           dispatch(updateUserProfile({userId:user._id,name,email,password}));
       }

    };
    return (
        <div>
            
            <form className="form" onSubmit={onSubmitHandler}>
            <div>
                   <h1>User profile</h1>
               </div>
               {
                   loading?<LoadingBox></LoadingBox>
                   :
                   error? <MessageBox variant="danger">{error}</MessageBox>
                   :
                   <>{updateLoading && <LoadingBox></LoadingBox>}
                   {updateError && <MessageBox variant="danger">{updateError}</MessageBox>}
                   {updateSuccess && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
                   <div>
                       <label htmlFor="name">Name</label>
                       <input id="name" type="text" 
                       placeholder="Enter Name" value={name}
                       onChange={(e)=>setName(e.target.value)}
                       ></input>
                   </div>
                   <div>
                       <label htmlFor="email">Email</label>
                       <input id="email" type="email"
                        placeholder="Enter email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        ></input>
                   </div>
                   <div>
                       <label htmlFor="password">Password</label>
                       <input id="password" type="password" 
                       placeholder="Enter Password"
                       onChange={(e)=>setPassword(e.target.value)}
                       ></input>
                   </div>
                   <div>
                       <label htmlFor="confirmPassword">confirm password</label>
                       <input id="confirmPassword" type="password" 
                       placeholder="Confirm password"
                       onChange={(e)=>setConfirmPassword(e.target.value)}
                       ></input>
                   </div>
                   <div>
                       <label></label>
                       <button className="primary">Update</button>
                   </div>
                   </>
               }
            </form>
            
        </div>
    )
}

export default ProfileView
