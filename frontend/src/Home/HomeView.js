import React, { useEffect } from 'react'
import Product from '../components/Product';
import MessageBox from './MessageBox';
import LoadingBox from './LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import Varieties from './Varieties';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { listTopSellers } from '../actions/userActions';

const HomeView = () => {

 
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading, error, products} = productList;
  
  const topSellersList = useSelector((state) => state.topSellersList);
  const {loading:loadingSellers, error:errorSellers,topSellers} = topSellersList;
   console.log(topSellers)

  useEffect(()=>{

         dispatch(listProducts({}));
         dispatch(listTopSellers());
  },[dispatch]);
  
    return (
      <>
      
      <Varieties/>
  
        
       {loadingSellers? (<LoadingBox></LoadingBox>)
       :
       errorSellers? (<MessageBox variant="danger">{errorSellers}</MessageBox>)
       : (
         <>
        {topSellers.length===0 && <MessageBox variant="danger">No sellers found</MessageBox>}
         <Carousel showArrows autoPlay autoFocus dynamicHeight={false} showThumbs={false}>
           {topSellers.map((seller)=>(
             <div key={seller._id}>
               <Link to={`/seller/${seller._id}`}>
                <img  src={seller.seller.logo} alt={seller.seller.name}/>
                <p className="legend">{seller.seller.name}</p>
               </Link>
             </div>
           ))}
         </Carousel>
        
        </>
       )
       
       }
    
       
      <div className="home-card">
      <Cards/>
      </div>
    
       {loading? <LoadingBox></LoadingBox>
       :
       error? <MessageBox variant="danger">{error}</MessageBox>
       :
       <>
       {products.length===0 && <MessageBox variant="danger">No Products found</MessageBox>}
       <div className="row center">

       {
         products.map((product=>(
           <Product key={product._id} product={product}/>
         )
          ))
       } 
      </div>
      </>
       }
     
       </>
    )
}

export default HomeView
