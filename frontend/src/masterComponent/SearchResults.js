import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

const SearchResults = (props) => {
  
    const {name="all",category="all",min=0,max=0,rating=0,order='newest',pageNumber=1} = useParams();
    const dispatch = useDispatch();
     
    const productList = useSelector(state=>state.productList);
    const {loading,error,products,page,pages} = productList;
    console.log(productList)
    const productCategoryList = useSelector(state=>state.productCategoryList);
    const {loading:loadingCategory,error:errorCategory,categories} = productCategoryList;

    const getFilterUrl=(filter)=>
    {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min? filter.min : filter.min ===0? 0 : min;
        const filterMax = filter.max? filter.max : filter.max ===0? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
    }

    useEffect(()=>
    {
        dispatch(listProducts({
            pageNumber,
            name:name!=='all'?name:'',
         category:category!=='all'?category:'',
        min,max,rating,order}));
    },[dispatch,name,category,min,max,rating,order,pageNumber])
    return (
        <div>
            <div  className="row">
            {loading?<LoadingBox/>
            :
            error?<MessageBox variant="danger">{error}</MessageBox>    
            :
     
            <div>
              <h3>  {products.length} Results</h3>
            </div>
         
        }
        <div className="sort" >
           Sort by : {' '}
            <select value={order} onChange={(e)=>{props.history.push(getFilterUrl({order:e.target.value}));}}>
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price:Low to high</option>
                <option value="highest">Price:High to Low</option>
                <option value="topRated">Ratings</option>

            </select>
            <br/>
        </div>
      
        </div>
        <div className="row top">
            <div className="col-1 card">
                <h3>Department</h3>
              
                {
                        loadingCategory?<LoadingBox/>
                        :
                        errorCategory?<MessageBox variant="danger">{errorCategory}</MessageBox>    
                        :
                
                           (  
                          <ul className="sidebar-categories">
                              {categories.map((c,idx)=>(
                                   <li key={idx+1}>
                                    <Link className={c=== category? 'active' : ''}
                                     to={getFilterUrl({category:c})}>{c}</Link>
                                    </li>
                              ))}
                       
                         </ul>
                         )
                }
                    <div>
                    <h3>Price</h3>
                    <ul className="sidebar-categories">
                       {
                       prices.map((p,idx)=>(
                           <li key={idx}>
                               <Link to={getFilterUrl({min:p.min,max:p.max})}
                               className={`${p.min}-${p.max}`===`${min}-${max}`?'active':''}>
                                   {p.name}
                               </Link>
                           </li>
                       ))}
                    </ul>
                   </div>
                   <div>
                    <h3>Rating</h3>
                    <ul className="sidebar-categories">
                       {
                       ratings.map((r,idx)=>(
                           <li key={idx}>
                               <Link to={getFilterUrl({rating:r.rating})}
                               className={`${r.rating}` === `${rating}`? 'active' :''}>
                                   {r.name}
                                   <Rating caption=" & up" rating={r.rating}></Rating>
                               </Link>
                           </li>
                       ))}
                    </ul>
                   </div>
               </div>
           
            <div className="col-3">
            {loading?<LoadingBox/>
            :
            error?<MessageBox variant="danger">{error}</MessageBox>    
            :(
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
           <div className="pagination row center">
               {
                   [...Array(pages).keys()].map(x=>(
                       <Link className={x+1===page?'active':''} key={x+1} to={getFilterUrl({page:x+1})}>{x+1}</Link>
                   ))
               }
           </div>
           </>
            
             ) }
            </div>
        </div>
        </div>
    )
}

export default SearchResults
