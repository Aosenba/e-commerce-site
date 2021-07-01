
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from './masterComponent/NavBar';
import HomeView from './Home/HomeView';
import ProductView from './components/ProductView';
import CartView from './cart/CartView';
import { useSelector } from 'react-redux';
import Sigin from './masterComponent/Sigin';
import Register from './masterComponent/Register';
import ShippingAddress from './components/ShippingAddress';
import Payment from './components/Payment';
import placeOrderView from './components/PlaceOrderView';
import OrderReview from './components/OrderReview';
import Footer from './masterComponent/Footer';
import OrderHistory from './components/OrderHistory';
import ScrollTop from './masterComponent/ScrollTop';
import ProfileView from './components/ProfileView';
import PrivateRoute from './components/PrivateRoute';
import ProductsView from './components/ProductsView';
import UserList from './admin/UserList';
import AdminRoute from './components/AdminRoute';
import SellerRoute from './components/SellerRoute';
import UserEdit from './admin/UserEdit';
import ProductList from './admin/ProductList';
import ProductEditView from './admin/ProductEditView';
import OrderListView from './admin/OrderListView';
import SellerPage from './components/SellerPage';
import SearchBox from './masterComponent/SearchBox';
import { useState } from 'react';
import feathers from './masterComponent/feathers.png';
import { Link } from 'react-router-dom';
import SearchResults from './masterComponent/SearchResults';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './Home/LoadingBox';
import MessageBox from './Home/MessageBox';
import Dashboard from './admin/Dashboard';

function App(props) {
  const [searchToggle, setSearchToggle] = useState(false);
  const burgertoggle = () => {
 
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-main");
    nav.classList.toggle("navActive");
    burger.classList.toggle("toggle");
  };
  const searchToggler=()=>
  {
    setSearchToggle(!searchToggle);
  }
  const productCategoryList = useSelector(state=>state.productCategoryList);
  const {loading:loadingCategory,error:errorCategory,categories} = productCategoryList;
  const [sideBarOpen, setSideBarOpen] = useState(false);
 const cart = useSelector(state => state.cart);
 const {cartItems }=cart; 
 const userSignin = useSelector((state)=>state.userSignin);
 const {userInfo} = userSignin;
 const [navbar, setNavBar] = useState(false);
 const changeBack = () => {
  if (window.scrollY > 60) {
    setNavBar(true);
  } else {
    setNavBar(false);
  }
};

window.addEventListener("scroll", changeBack);
  const dispatch = useDispatch();
  useEffect(()=>
  {
      dispatch(listProductCategories());
  },[dispatch]);


  return (
 <BrowserRouter >
 <ScrollTop/>
    <div className="grid-container">
    <header className={navbar? "onScroll":""}>
                <div className={searchToggle?"main-header h-close":"main-header"}>

                <div className={searchToggle?"logo up":"logo"} >
            
                    <Link to="/" className="logo-name"><img src={feathers} alt="logo"/>Vicarious</Link>
                
                </div>
                <Route render={({history})=>(
              <SearchBox history={history} searchToggler={searchToggler} searchToggle={searchToggle}> </SearchBox>
            )}></Route>
            <NavBar cartItems={cartItems} userInfo={userInfo} toggle={burgertoggle}></NavBar>
            <div className="burger" onClick={burgertoggle}>
                        <div className="l1"></div>
                        <div className="l2"></div>
                        <div className="l3"></div>
                </div>
                
                <aside className={sideBarOpen? 'open':''}>
    <ul className="categories">
    <button onClick={()=>setSideBarOpen(!sideBarOpen)} className={navbar?"close-sidebar":"close-sidebar scroll"}
        type="button"
        ><i className={!sideBarOpen?"fa fa-plus c1":"fa fa-plus c1 c2"}/></button>
      <li>
        <strong>Categories</strong>
       
      </li>
      { 
                        loadingCategory?<LoadingBox/>
                        :
                        errorCategory?<MessageBox variant="danger">{errorCategory}</MessageBox>    
                        :
                
                           (  
                      
                            categories.map((c,idx)=>(
                                   <li key={idx+1}>
                                    <Link onClick={()=>setSideBarOpen(false)}
                                     to={`/search/category/${c}`}>{c}</Link>
                                    </li>
                              ))
                       
                         )
                }
               
    </ul>

  </aside>
  </div>
  </header>
 
    <main>
        <Route path='/' exact component={HomeView}/>
        <Route path="/product/:id" exact component={ProductView}/>
        <Route path="/product/:id/edit" exact component={ProductEditView}/>
        <Route path="/cart/:id?" component={CartView}/>
        <Route path="/signin" component={Sigin}/>
        <Route path="/register" component={Register}/>
        <Route path="/shipping" component={ShippingAddress}/>
        <Route path="/paymentmethod" component={Payment}/>
        <Route path="/placeorder" component={placeOrderView}/>
        <Route path="/order/:id" component={OrderReview}/>
        <Route path="/orderhistory" component={OrderHistory}/>
        <Route path="/products/:id" component={ProductsView}/>
        <Route path="/seller/:id" component={SellerPage}/>
        <Route path="/search/name/:name?" exact component={SearchResults}/>
        <Route path="/search/category/:category" exact component={SearchResults}/>
        <Route path="/search/category/:category/name/:name" exact component={SearchResults}/>
        <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber" exact component={SearchResults}/>
        <PrivateRoute path="/profile" component={ProfileView}></PrivateRoute>
        <AdminRoute path="/userlist" component={UserList}></AdminRoute>
        <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
        <AdminRoute path="/productlist" exact component={ProductList}></AdminRoute>
        <AdminRoute path="/productlist/pageNumber/:pageNumber" exact component={ProductList}></AdminRoute>
        <AdminRoute path="/orderlist" exact component={OrderListView}></AdminRoute>
        <AdminRoute path="/dashboard" exact component={Dashboard}/>
        <SellerRoute path="/productlist/seller" component={ProductList}/>
        <SellerRoute path="/orderlist/seller" component={OrderListView}/>
        

    </main>
    <footer>
    <Footer/>
    </footer>


</div>
</BrowserRouter>
  );
}

export default App;
