import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../actions/userActions';
import Categories from './Categories';
import feathers from './feathers.png';

const NavBar = ({cartItems,userInfo}) => {

    const [navbar, setNavBar] = useState(false);
    const burgertoggle = () => {
      const burger = document.querySelector(".burger");
      const nav = document.querySelector(".nav-main");
    
      nav.classList.toggle("navActive");
      burger.classList.toggle("toggle");
    };

    const dispatch = useDispatch();
  const signoutHandler =()=>
  {
    const res= window.confirm("are you sure you want to sign out?");
    if(res===true)
    {
        dispatch(signout());
    }   
  };

  const changeBack = () => {
    if (window.scrollY > 60) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };
  window.addEventListener("scroll", changeBack);
    return (
       
            <header className={navbar? "onScroll":""}>
        <div className="burger" onClick={burgertoggle}>
                <div className="l1"></div>
                <div className="l2"></div>
                <div className="l3"></div>
        </div>
        <div className="logo">
        <img src={feathers} alt="logo"/>
            <Link to="/">Vicarious</Link>
        </div>
        <div className="nav-main">
        <div className="nav-links">
            <Link to="/">Home</Link>
            <div className="drop">
            <Link  to="#">Categories
             <Categories/> <i className="fa fa-caret-down down"></i>
            </Link>
            </div>
            <Link to="/l">Services</Link>
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
    </header>
       
    )
}

export default NavBar;
