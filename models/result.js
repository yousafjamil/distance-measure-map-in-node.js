const mongoose = require('mongoose');




const resultSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,ref:'user' },
    quizeId: { type: mongoose.Schema.Types.ObjectId,ref:'quize' },
    total:{
        type:Number,
        required:true
    },
    score:{
        type:Number,
        required:true
    },

})




let Result = mongoose.model("result", resultSchema);

module.exports = {
   
    Result
}

