const jwt = require("jsonwebtoken");
const User = require("../models/User");//why because after verifying token we need to fethc user details from mongodb

const protect=async(req,res,next)=>{
    let token;
    try{
                // Check if Authorization header exists
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
      //extrct token
      token=req.headers.authorization.split(" ")[1];
      //verify token
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      //find user by id stored inside token
      req.user=await User.findById(decoded.id).select("-password");
      //fetch everything except password
      next();
        }else{
            return res.status(401).json({success:false,message:"not authorized"});
        }
    }catch(error){
        return res.status(401).json({success:false,message:"invalid token"});
    }

};
module.exports={protect};
