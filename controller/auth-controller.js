
import User from "../models/User.js"
import bcrypt from "bcrypt"
const signup=async(req,res,next)=>{
    try{
    const {username,email,password}=req.body;
    const saltRounds=10;
    const salt=await bcrypt.genSalt(saltRounds);
    const hashedPassword=await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    

    const newUser= await User.create({username,email,password:hashedPassword});
    console.log(newUser);
    
    if(!newUser){
        return res.status(400).json({message:"User not created"});
    }


    res.status(201).json({message:"user register successfully",
    data:newUser
    });}

    catch(err){
       next(err);
    }
    
    
}
const login=(req,res)=>{
    res.json({message:"Login route is working"});


}

export {signup,login}