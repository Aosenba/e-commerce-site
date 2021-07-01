import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditView = (props) => {


    const productId=props.match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');
    const productDetails = useSelector(state=>state.productDetails);
    const {loading,error,product}=productDetails;
    const dispatch = useDispatch();
 
    const productUpdate =useSelector(state=>state.productUpdate);
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate} = productUpdate;

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState(false);
    const uploadFileHandler =async(e)=>
    {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image',file);
        setLoadingUpload(true);
        try {
            const {data} = await Axios.post('/api/uploads/s3',bodyFormData,{
                headers :{
                    'Content-Type':'multipart/form-data',
                    Authorization : `Bearer ${userInfo.token}`,
                }
            })
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message)
            setLoadingUpload(false);
        }
    };

    useEffect(()=>{
        if(successUpdate)
        {
      
            props.history.push('/productlist');
        }
        if(!product || (product._id!==productId) || successUpdate)
        {
            dispatch({type:PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        }
       else{
        setName(product.name);
        setImage(product.image);
        setPrice(product.price);
        setCategory(product.category);
        setBrand(product.brand)
        setCountInStock(product.countInStock);
        setDescription(product.description);
        
       }
    },[product,dispatch,productId,props.history,successUpdate]);

    
    const submitHandler=(e)=>
    {
        e.preventDefault();
        dispatch(updateProduct({_id:productId,name,price,image,category,brand,countInStock,description}));
    };

    return (
       
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Edit product details {productId}</h2>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                   loading? <LoadingBox/>
                   :
                   error? <MessageBox variant="danger">{error}</MessageBox>
                   :
                   <>
                   <div>
                       <label  htmlFor="name">Name</label>
                       <input type="text" id="name" value={name} placeholder="Enter Name" 
                       onChange={e=>setName(e.target.value)}></input>
                   </div>
                   <div>
                       <label htmlFor="imageFile">Image file</label>
                       <input type="file" id="imageFile" label="select Image" onChange={uploadFileHandler}></input>
                       {loadingUpload && <LoadingBox/>}
                       {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                   </div>
                   <div>
                       <label  htmlFor="image">Image</label>
                       <input type="text" id="image" value={image} placeholder="Enter image file" 
                       onChange={e=>setImage(e.target.value)}></input>
                   </div>
                   <div>
                       <label  htmlFor="price">Price</label>
                       <input type="text" id="price" value={price} placeholder="Enter price" 
                       onChange={e=>setPrice(e.target.value)}></input>
                   </div>
                   <div>
                       <label  htmlFor="brand">Brand</label>
                       <input type="text" id="brand" value={brand} placeholder="Enter brand name" 
                       onChange={e=>setBrand(e.target.value)}></input>
                   </div>
                   <div>
                       <label  htmlFor="category">Category</label>
                       <input type="text" id="category" value={category} placeholder="Enter Category" 
                       onChange={e=>setCategory(e.target.value)}></input>
                   </div>
                   <div>
                       <label  htmlFor="countinstock">No of stocks</label>
                       <input type="text" id="countinstock" value={countInStock} placeholder="Enter No of Stocks" 
                       onChange={e=>setCountInStock(e.target.value)}></input>
                   </div>
                   <div>
                       <label  htmlFor="description">description</label>
                       <textarea type="text" id="description" rows="3" value={description} placeholder="Enter Description" 
                       onChange={e=>setDescription(e.target.value)}></textarea>
                   </div>
                   <div>
                       <label/>
                       <button type="submit" className="primary">Update</button>
                   </div>
                   </>
                }
            </form>
        </div>
     
     
    )
            
}

export default ProductEditView
