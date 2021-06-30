import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signout } from '../actions/userActions';
import Categories from './Categories';



const NavBar = ({cartItems,userInfo,toggle}) => {
  const history = useHistory();
  const [menuToggle, setMenuToggle] = useState(false);
  const [menuToggle2, setMenuToggle2] = useState(false);
  const [menuToggle3, setMenuToggle3] = useState(false);

  

    const dispatch = useDispatch();
  const signoutHandler =()=>
  {
    const res= window.confirm("are you sure you want to sign out?");
    if(res===true)
    {
        dispatch(signout());
        history.push('/');
    }   
  };


    return (
       
          <>
    
       
       
        <div className="nav-main">
        <div className="nav-links">
        <Link to="/"  onClick={toggle}>Home</Link>
            <div className="drop">
         
            <Link  to="#">Categories
             <Categories/> <i className="fa fa-caret-down down"></i>
            </Link>
            </div>

            <Link to="/" onClick={toggle}>About us</Link>
     
            {
                userInfo? (
                    <div className="dropdown">
                      <div>
                    <Link to="#"  
                     className="nameTag">{userInfo.name} 
                    
                    </Link>
                    <i className={!menuToggle? "fa fa-caret-down down" : "fa fa-caret-down  down-rotate"} 
                    onClick={()=>setMenuToggle(!menuToggle)}></i>
                    </div>
                    <ul className={menuToggle?"dropdown-small open-menu" : "dropdown-small"}>
                        <li><Link  onClick={toggle} to="/profile">My profile</Link> </li>
                        <li> <Link  onClick={toggle} to="/orderhistory">Order History</Link>  </li>
                        <li className="signout" onClick={signoutHandler} >
                           <Link  onClick={toggle} to="#signout">   sign out</Link>
                        </li>
                    </ul>
                    </div>
                ):
                (
                  <Link to="/signin"  onClick={toggle}>Sign In</Link> 
                )
               
            }
            {
              userInfo && userInfo.isSeller &&
              <div className="dropdown">
                <div>
              <Link   className="nameTag" to="#admin" >Seller{' '} </Link>
              <i className={!menuToggle2? "fa fa-caret-down down" : "fa fa-caret-down  down-rotate"} 
               onClick={()=>setMenuToggle2(!menuToggle2)}></i>
              </div>
              <ul className={menuToggle2?"dropdown-small open-menu" : "dropdown-small"}>
           
                <li><Link  onClick={toggle} to="/productlist/seller">Products</Link></li>
                <li><Link  onClick={toggle} to="/orderlist/seller">Orders</Link></li>
           
              </ul>
              </div>
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <div>
                <Link to="#admin" >Admin {' '}  </Link>
                <i className={!menuToggle3? "fa fa-caret-down down" : "fa fa-caret-down  down-rotate"} 
                  onClick={()=>setMenuToggle3(!menuToggle3)}></i>
                 </div>
                <ul className={menuToggle3?"dropdown-small open-menu" : "dropdown-small"}>
                  <li><Link  onClick={toggle} to="/dashboard">DashBoard</Link></li>
                  <li><Link  onClick={toggle} to="/productlist">Products</Link></li>
                  <li><Link  onClick={toggle} to="/orderlist">Orders</Link></li>
                  <li><Link  onClick={toggle} to="/userlist">Users</Link></li>
                </ul>
                </div>
            )}
          
            <Link to="/cart"  onClick={toggle}>
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
