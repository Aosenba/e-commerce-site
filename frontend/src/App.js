
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
import UserEdit from './admin/UserEdit';
import ProductList from './admin/ProductList';
import ProductEditView from './admin/ProductEditView';
import OrderListView from './admin/OrderListView';
function App() {


 const cart = useSelector(state => state.cart);
 const {cartItems }=cart; 
 const userSignin = useSelector((state)=>state.userSignin);
 const {userInfo} = userSignin;

  return (
 <BrowserRouter >
 <ScrollTop/>
    <div className="grid-container">
    <NavBar cartItems={cartItems} userInfo={userInfo}/>
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
        <PrivateRoute path="/profile" component={ProfileView}></PrivateRoute>
        <AdminRoute path="/userlist" component={UserList}></AdminRoute>
        <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
        <AdminRoute path="/productlist" component={ProductList}></AdminRoute>
        <AdminRoute path="/orderlist" component={OrderListView}></AdminRoute>

    </main>
    <footer>
    <Footer/>
    </footer>


</div>
</BrowserRouter>
  );
}

export default App;
