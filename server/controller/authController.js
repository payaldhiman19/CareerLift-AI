
const User=require('../models/User');
const bcrypt = require("bcryptjs");
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
            res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
      //create
      const hasPassword=await bcrypt.hash(password,10);
      const user=await Usder.create({
        name,
        email,
        password:hashPassword,
        targetRole
      });
      res.status(201).json({message:"user registered successfully",user});
    }catch(error){
        res.status(500).json({message:error.message});

    }
};

module.exports={registerUser}