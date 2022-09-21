const { register,loginUser } = require('../controllers/user');

const router=require('express').Router();


router.post('/signup',register)
router.post('/login',loginUser)


module.exports=router;





