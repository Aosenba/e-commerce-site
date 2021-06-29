import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/top-sellers',expressAsyncHandler(async(req,res)=>
{
    const topSellers = await User.find({isSeller:true}).sort({'seller-rating':-1}).limit(3);
    res.send(topSellers);
}))

userRouter.post('/signin',expressAsyncHandler(async(req,res)=>
{
    const user = await User.findOne({email : req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password))
        {
            res.send({
                _id :  user._id,
                name : user.name,
                email : user. email,
                isAdmin : user.isAdmin,
                isSeller:user.isSeller,
                token : generateToken(user)
            });
            return;
        }
    };
     res.status(401).send({message:'invalid username or password'});
}));

userRouter.post('/register',expressAsyncHandler(async(req,res)=>
{
    const user = new User({
         name : req.body.name,
         email : req.body.email, 
         password : bcrypt.hashSync(req.body.password,8)});
    const createdUser = await user.save();
    res.send({
                _id :  user._id,
                name : user.name,
                email : user. email,
                isAdmin : user.isAdmin,
                isSeller:user.isSeller,
                token : generateToken(createdUser)
    });
}));

userRouter.get('/:id', expressAsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }
    else{
        res.status(404).send({messgae: "User not found"});
    }
}));

userRouter.put('/profile',isAuth,expressAsyncHandler(async(req,res)=>
{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(user.isSeller)
        {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.logo || user.seller.logo;
            user.seller.description = req.body.description|| user.seller.description;
        }
        if(req.body.password)
        {
            user.password = bcrypt.hashSync(req.body.password,8);
        }
        const updatedUser = await user.save();
        res.send({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            isSeller:user.isSeller,
            seller : user.seller,
            token : generateToken(updatedUser),
        });
    }
}));

userRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>
{
    const users= await User.find({});
    res.send(users);
}));

userRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.id);
    if(user){
        if(user.email === 'aosenbalongchar@gmail.com')
        {
            res.status(400).send({message:"Admin cannot be deleted"});
            return;
        }
        const deleteUser =  await user.remove();
        res.send({message:"User deleted", user:deleteUser});
    
    }
    else{
        res.status(404).send({messsage:"User not found"});
    }
}));

userRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>
{
    const user = await User.findById(req.params.id);
    if(user)
    {
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=Boolean(req.body.isAdmin);
        user.isSeller=Boolean(req.body.isSeller);
        const updatedUser = await user.save();
        res.send({message:"User updated",user:updatedUser});
    }
    else{
        res.status(404).send({message:"User not found"});
    }
}));

export default userRouter;