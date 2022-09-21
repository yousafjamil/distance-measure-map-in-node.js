const router=require('express').Router();
const { startQuize, submitExam } = require('../controllers/Exam');
const auth = require('../middleware/auth');



router.get('/start/:id',auth,startQuize)

router.post('/submit/:id',auth,submitExam)

module.exports=router;
