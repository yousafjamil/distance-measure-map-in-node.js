const { createQuize, getQuize, updateQuize, deleteQuize, publishQuize } = require('../controllers/quiz');
const auth = require('../middleware/auth');

const router=require('express').Router();

router.post('/create',auth,createQuize);

router.get('/getquize/:id',auth,getQuize)

router.get('/publishquize/:id',auth,publishQuize)

router.put('/updatequize/:id',auth,updateQuize)

router.delete('/deletequize/:id',auth,deleteQuize)


module.exports=router;