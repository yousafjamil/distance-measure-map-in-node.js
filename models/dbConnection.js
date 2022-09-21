const  mongoose=require('mongoose');



const Dbconnection=async( )=>{
try {
 mongoose.connect('mongodb+srv://yousaf:yousaf03448307585@cluster0.igtgl.mongodb.net/?retryWrites=false&w=majority')
     console.log('db connected....')
} catch (error) {
    console.log('db not connected')
}

}

module.exports=Dbconnection;