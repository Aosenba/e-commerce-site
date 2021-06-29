import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useParams,Link } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';

const ProductList = (props) => {

    const {pageNumber=1}= useParams();
    const sellerMode = props.match.path.indexOf('/seller')>=0;
    const productList = useSelector(state=>state.productList);
    const {loading,error,products,page,pages}= productList;

    const productCreate = useSelector(state=>state.productCreate);
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdProduct} = productCreate;
  
    const dispatch = useDispatch();
   
    const productDelete =useSelector(state=>state.productDelete);
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete;

    const userSignin =useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;

    const deleteHandler=(productId)=>{
        if(window.confirm("Are you sure you want to delete"))
        {
            dispatch(deleteProduct(productId));
        }
   
    };
    
    const createHandler=()=>
    {
        dispatch(createProduct());  
    }
    useEffect(()=>{
        if(successCreate)
        {
            dispatch({type:PRODUCT_CREATE_RESET});
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if(successDelete)
        {
            dispatch({type:PRODUCT_DELETE_RESET});
        }
        dispatch(listProducts({seller:sellerMode?userInfo._id :'',pageNumber}));
    },[createdProduct,dispatch,props.history,sellerMode,successCreate,successDelete,userInfo._id,pageNumber]);

    return (
        <div>
            <div className="row">
            <h1>Products</h1>
            <button type="button" className="primary" onClick={createHandler}>
                Create Product
            </button>
            </div>
            <br/>
            {loadingDelete && <LoadingBox/>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox/>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            <br/>
            {loading?<LoadingBox></LoadingBox>
            :
             error? <MessageBox variant="danger">{error}</MessageBox>
            :
            <>
            <table className="table">
                <thead>
                <tr>
                    <th>Seller Name</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Actions</th>
                </tr>

                </thead>
               <tbody>
                   {
                       products.map((product,idx)=>(
                        
                           <tr key={product._id}>
                               <td>{product.seller.seller.name}</td>
                               <td>{product.name}</td>
                               <td>{product.price}</td>
                               <td>{product.category}</td>
                               <td>{product.brand}</td>
                               <td>
                                            <button type="button"
                                             className="primary small"
                                             onClick={()=>props.history.push(`/product/${product._id}/edit`)}
                                             >Edit</button>
                                            <button type="button"
                                             className="primary small"
                                             onClick={()=>deleteHandler(product._id)}
                                             >Delete</button>
                                        </td>
                           </tr>
                         
                       ))
                   }
               </tbody>
            </table>
                <div className="pagination row center">
                {
                    [...Array(pages).keys()].map(x=>(
                        <Link className={x+1===page?'active':''} key={x+1} to={`/productlist/pageNumber/${x+1 }`}>{x+1}</Link>
                    ))
                }
            </div>
            </>
            }
            
        </div>
    )
}

export default ProductList
