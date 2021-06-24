import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';
import Categories from './Categories';



const NavBar = ({cartItems,userInfo}) => {

  
  

    const dispatch = useDispatch();
  const signoutHandler =()=>
  {
    const res= window.confirm("are you sure you want to sign out?");
    if(res===true)
    {
        dispatch(signout());
    }   
  };


    return (
       
          <>
    
       
       
        <div className="nav-main">
        <div className="nav-links">
       
            <div className="drop">
            <Link  to="#">Categories
             <Categories/> <i className="fa fa-caret-down down"></i>
            </Link>
            </div>
            <Link to="/">About us</Link>
     
            {
                userInfo? (
                    <div className="dropdown">
                      <div>
                    <Link to="#"
                     className="nameTag">{userInfo.name} 
                    
                    </Link>
                    <i className="fa fa-caret-down down"></i>
                    </div>
                    <ul className="dropdown-small" >
                        <li><Link to="/profile">My profile</Link> </li>
                        <li> <Link to="/orderhistory">Order History</Link>  </li>
                        <li className="signout" onClick={signoutHandler} >
                           <Link to="#signout">   sign out</Link>
                        </li>
                    </ul>
                    </div>
                ):
                (
                  <Link to="/signin">Sign In</Link> 
                )
               
            }
            {
              userInfo && userInfo.isSeller &&
              <div className="dropdown">
              <Link to="#admin" >Seller{' '} <i className="fa fa-caret-down down"></i></Link>
              <ul className="dropdown-small">
           
                <li><Link to="/productlist/seller">Products</Link></li>
                <li><Link to="/orderlist/seller">Orders</Link></li>
           
              </ul>
              </div>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin" >Admin {' '} <i className="fa fa-caret-down down"></i></Link>
                <ul className="dropdown-small">
                  <li><Link to="/dashboard">DashBoard</Link></li>
                  <li><Link to="/productlist">Products</Link></li>
                  <li><Link to="/orderlist">Orders</Link></li>
                  <li><Link to="/userlist">Users</Link></li>
                </ul>
                </div>
            )}
          
            <Link to="/cart">
            <i className="fa fa-shopping-cart cart"></i>
                {
                    cartItems.length>0 &&
                    <span className="cartBadge">{cartItems.length}</span>
                }
                
            </Link>
        </div>
        </div>
    </>
       
    )
}

export default NavBar;
