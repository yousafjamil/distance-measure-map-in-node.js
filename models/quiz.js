const mongoose = require('mongoose');
const Joi = require('joi');



const quizSchema = mongoose.Schema({
    name: { type: String, required: [true, 'quiz name is required'] },
    questions_list:[{
     question_number:{
        type:Number,
        
     },
     question:{
        type:String
        
     },
     option:{}
    }],
    answers: {},
    isPublish:{
        type:Boolean,
        default:false
    },
    owner: { type: mongoose.Schema.Types.ObjectId,ref:'user' },


})

const validate = (quize) => {
    const shcema = Joi.object({
        name: Joi.string().required(),
        questions_list: Joi.required(),
        answers: Joi.required(),
       

    })
    return shcema.validate(quize)
}



let Quize = mongoose.model("quize", quizSchema);

module.exports = {
    validate,
    Quize
}

