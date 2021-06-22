import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import LoadingBox from '../Home/LoadingBox'
import MessageBox from '../Home/MessageBox'


const UserList = (props) => {
   const dispatch = useDispatch();
   const userList = useSelector(state=>state.userList);
   const {loading,error,users}=userList;

   const userDelete = useSelector(state=>state.userDelete);
   const {loading:loadingDelete,error:errorDelete,success:successDelete}=userDelete;

   const deleteHandler =(user)=>
   {
    if(window.confirm('Are you sure?')){
        dispatch(deleteUser(user._id));
    }
   }

    useEffect(()=>
    {
        dispatch(listUsers());
        dispatch({type:USER_DETAILS_RESET});
    },[dispatch,successDelete]);

    return (
        <>
            <h1>Users</h1>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {successDelete && <MessageBox variant="success">User Deleted Success</MessageBox>}
            {
                loading? (<LoadingBox/>)
                :
                error? (<MessageBox variant="danger">{error}</MessageBox>)
                :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Is seller</th>
                                <th>Is Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,idx)=>
                                (
                                    <tr key={user._id}>
                                        <td>{idx+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isSeller?"YES" :"NO"}</td>
                                        <td>{user.isAdmin?"YES":"NO"}</td>
                                        <td>
                                            <button type="button"
                                             className="primary small"
                                             onClick={()=>props.history.push(`/user/${user._id}/edit`)}
                                             >Edit</button>
                                            <button type="button"
                                             className="primary small"
                                             onClick={()=>deleteHandler(user)}
                                             >Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
            
        </>
    )
}

export default UserList
