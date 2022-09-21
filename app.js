const  express=require('express');
const  app=express();
const dbconnection=require('./models/dbConnection');
const cookieParser = require("cookie-parser");



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
// user root route
app.use('/user',require('./routes/user'))

// quize root route
app.use('/quize',require('./routes/quize'));

// exam  root route
app.use('/exam',require('./routes/exam'))
// error handler
app.use( (error,req,res,next)=>{
    var error=new Error('not found');
    let status=error.status=404 || 500
    res.json({
        message:error.message,
        status,
        stack:error
    })
})
// app.use((error,req,res,next)=>{
  
//     const  error=new Error('page not found'  )
//     res.status(404).json({
//         status,
//         error:err.message
//     })
// })
app.listen(3000,()=>{
    dbconnection()
    console.log('app   started at  port 3000')
})