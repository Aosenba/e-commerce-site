import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/vicarious',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true   
});

app.use('/api/uploads',uploadRouter);
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/frontend/build/index.html')));
app.use('/api/users', userRouter); 

app.use('/api/products',productRouter);

app.use('/api/orders',orderRouter);

app.get('/api/config/gpay', (req,res)=>
{
    res.send(process.env.GOOGLE_PAY_CLIENT_ID) || 'sb'
});

app.use((err,req,res,next)=>
{
    res.status(500).send({message : err.message});
});

app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
const port = process.env.PORT || 5000;

app.listen(port, () =>
{
    console.log(`server is at http://localhost:${port}`);
});
