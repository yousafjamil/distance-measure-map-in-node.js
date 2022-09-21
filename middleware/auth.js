const jwt=require('jsonwebtoken');
const { User } = require('../models/user');

const auth=async(req,res,next)=>{
    try {
    
        const token=req.headers.token;
        
        if(!token) return res.status(404).json({message:'Unauthorized user'})

        const decoded=jwt.verify(token,'some secret here');
      
        const verifiedUser=await User.findById(decoded.id);
        
        if(!verifiedUser) return res.status(404).json({message:'Invalid user'})

        req.user=verifiedUser;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports=auth;