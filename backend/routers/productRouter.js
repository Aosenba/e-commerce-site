import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../utils.js';


const productRouter = express.Router();

productRouter.get('/',expressAsyncHandler(async(req,res)=>
{
    const seller = req.query.seller || '';
    const sellerFilter = seller ? {seller} : {}; 
    const products = await Product.find({...sellerFilter}); 
    res.send(products);
})); 


// productRouter.get('/seed', expressAsyncHandler(async(req,res)=>
// { 
//     const createdProducts = await Product.insertMany(data.products);
//     res.send({createdProducts});
// }));

productRouter.get('/:id',expressAsyncHandler(async(req,res)=>
{
    const product = await Product.findById(req.params.id);
    if(product)
    {
        res.send(product);
    }
    else
    {
        res.status(404).send({message : "product not found"});
    }

}));

productRouter.post('/',isAuth,isSellerOrAdmin,isSeller,expressAsyncHandler(async(req,res)=>
{
    const product = new Product({
        name:"demo" + Date.now(),
        seller:req.user._id,
        image:"sample.jpg",
        brand:"sample",
        category:"shoes",
        price:"1200",
        countInStock:0,
        rating:0,
        numReviews:0,
        description:"sample"
      
    });
    const createdProduct= await product.save();
    res.send({message:"product created",product:createdProduct});
}));

productRouter.put('/:id',isAuth,isAdmin,isSellerOrAdmin,expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product)
    {
        product.name=req.body.name;
        product.price=req.body.price;
        product.image = req.body.image;
        product.category= req.body.category;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        product.description=req.body.description;
        const updatedProduct = await product.save();
        res.send({message:'product Updated',product:updatedProduct});
    }
    else{
        res.status(404).send({message:"product not found"});
    }
})); 

productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>
{
    const product = await Product.findById(req.params.id);
    if(product)
    {
        const deletedProduct = await product.remove();
        res.send({message:"Product Deleted", product:deletedProduct});
    }
    else{
        res.status(404).send({message:"product not found"});
    }
})); 

export default productRouter;