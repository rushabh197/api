import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user-route.js';
import authRoute from './routes/auth-route.js';
dotenv.config();

const app=express();
app.use(express.json());


app.use('/api',userRoute);
app.use('/api/auth',authRoute);

mongoose.connect(process.env.MONGO_CONNECT).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log('Error connecting to MongoDB',err);
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use((err,req,res,next)=>{
    
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(404).json({
        success:false,
        status:statusCode,
        message});
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}
)