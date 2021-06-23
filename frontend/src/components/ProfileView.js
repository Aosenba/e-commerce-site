
import React, { useEffect } from 'react'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import { PROFILE_UPDATE_RESET } from '../constants/userConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import Axios from 'axios';

const ProfileView = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin; 
    const userDetails = useSelector(state=>state.userDetails);
    const {user,loading,error}= userDetails;
    const updateProfile = useSelector(state=>state.updateProfile);
    const {error:updateError,success:updateSuccess,loading:updateLoading} = updateProfile;
  
    const dispatch = useDispatch();
    
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState(false);
    const uploadFileHandler =async(e)=>
    {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image',file);
        setLoadingUpload(true);
        try {
            const {data} = await Axios.post('/api/uploads',bodyFormData,{
                headers :{
                    'Content-Type':'multipart/form-data',
                    Authorization : `Bearer ${userInfo.token}`,
                }
            })
            setLogo(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message)
            setLoadingUpload(false);
        }
    };
    useEffect(()=>{
        if(!user)
        {
            dispatch({type:PROFILE_UPDATE_RESET});
            dispatch(detailsUser(userInfo._id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            if(user.seller)
            {
                setSellerName(user.seller.name);
                setLogo(user.seller.logo);
                setDescription(user.seller.description);
            }
        }
      

    },[dispatch,userInfo._id,user,updateSuccess,]);

    const onSubmitHandler =(e)=>
    {
        e.preventDefault();
       if(password!==confirmPassword)
       {
           alert("passwords do not match")
       }
       else{
           dispatch(updateUserProfile({userId:user._id,name,email,password,sellerName,logo,description}));

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
                   {
                       user.isSeller && (
                           <>
                            <h2>Seller</h2>
                            <div>
                                <label htmlFor="sellerName">Seller Name</label>
                                <input id="sellerName" type="text" placeholder="enter your name"
                                value={sellerName} onChange={(e)=>setSellerName(e.target.value)}>

                                </input>
                            </div>
                    
                            <div>
                                <label htmlFor="logo">Logo</label>
                                <input type="file" id="logo" label="select Logo" onChange={uploadFileHandler}></input>
                                {loadingUpload && <LoadingBox/>}
                                {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                            </div>
                            <div>
                                    <label  htmlFor="logo">Image</label>
                                    <input type="text" id="logo" value={logo} placeholder="Enter image file" 
                                    onChange={e=>setLogo(e.target.value)}></input>
                           </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <input id="description" type="text" placeholder="enter Description"
                                value={description} onChange={(e)=>setDescription(e.target.value)}>
                                    
                                </input>
                            </div>
                           </>
                       )
                   }
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
