const User=require('../models/User');
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const registerUser=async(req,res)=>{
    try{
        const{name,email,password,targetRole}=req.body;
        if(!name||!email||!password||!targetRole){
            return res.status(400).json({
                success:false,
                message:"Please provide all required fields"
            });
        }
        //check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
          return  res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
      //create
      const hashPassword=await bcrypt.hash(password,10);
      const user=await User.create({
        name,
        email,
        password:hashPassword,
        targetRole
      });
    res.status(201).json({success:true,
    message:"user registered successfully",
    token:generateToken(user._id),
user:{
    id:user._id,
    name:user.name,
    email:user.email,
    targetRole:user.targetRole
}
});
    }catch(error){
        res.status(500).json({success:false, 
            message:error.message});
    }
};
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"please provide email and password"
        });
        }
        const user=await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            //unauthorized
             return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        //if matched
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole
    }
        });
    }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    };
const getProfile=async(req,res)=>{
    res.status(200).json({success:true,user:req.user});
};
module.exports={registerUser,loginUser,getProfile};