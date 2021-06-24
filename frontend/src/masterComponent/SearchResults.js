import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import Product from '../components/Product';

const SearchResults = (props) => {
    const {name="all",category="all"} = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state=>state.productList);
    const {loading,error,products} = productList;
    
    const productCategoryList = useSelector(state=>state.productCategoryList);
    const {loading:loadingCategory,error:errorCategory,categories} = productCategoryList;

    const getFilterUrl=(filter)=>
    {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    }

    useEffect(()=>
    {
        dispatch(listProducts({
            name:name!=='all'?name:'',
         category:category!=='all'?category:''}));
    },[dispatch,name,category])
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
        </div>
        <div className="row top">
            <div className="col-1">
                <h3>Department</h3>
                {
                        loadingCategory?<LoadingBox/>
                        :
                        errorCategory?<MessageBox variant="danger">{errorCategory}</MessageBox>    
                        :
                
                           (  
                          <ul>
                              {categories.map((c,idx)=>(
                                   <li key={idx+1}>
                                    <Link className={c=== category? 'active' : ''}
                                     to={getFilterUrl({category:c})}>{c}</Link>
                                    </li>
                              ))}
                       
                         </ul>
                         )
                }
               
            </div>
            <div className="col-3">
            {loading?<LoadingBox/>
            :
            error?<MessageBox variant="danger">{error}</MessageBox>    
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
            </div>
        </div>
        </div>
    )
}

export default SearchResults
