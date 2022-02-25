const  express=require('express');
const  app=express();



app.use(express.urlencoded({extended:true}));
app.use(express.json());
 app.use(express.static("public"))
app.set('view engine','ejs');
app.set('views','views')



app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})


app.listen(3000,()=>{
    console.log('app   started at  port 3000')
})