const {User,validate}=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const register=async(req,res,next)=>{

try {
    const {error}=validate(req.body);

if(error) return res.status(400).send({message:error.details[0].message});

const user=await User.findOne({email:req.body.email});

if(user) return res.status(400).json({message:"user already  exist."});

const hashpassword=await bcrypt.hash(req.body.password,10);

const savedUser=await User.create({...req.body,password:hashpassword});

const token=jwt.sign({id:savedUser.id,isAdmin:savedUser.isAdmin},'some secret here')
  
res.cookie('token',token).json({message:'user successfully registered'})
} catch (error) {
   next(error) 
}
}

// login  user;
const  loginUser=async(req,res,next)=>{
try {
    const {error}=validate(req.body);

    if(error) return res.status(400).send({message:error.details[0].message});
    const user=await User.findOne({email:req.body.email});

    if(!user)   return res.status(400).json({message:"user does not exist."});

const verifypassword=await bcrypt.compare(req.body.password,user.password);

if(!verifypassword) { return res.status(400).json({message:"invalid password"})}

else {
    const token=jwt.sign({id:user.id,isAdmin:user.isAdmin},'some secret here')
    
res.cookie('token',token).json({message:'user successfully login'})

}

} catch (error) {
    next(error)
}
}
module.exports={
    register,
    loginUser
}