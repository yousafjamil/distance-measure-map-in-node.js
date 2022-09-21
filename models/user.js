const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'] },
    password: { type: String, required: [true, 'password is required'] },
    isAdmin: { type: Boolean, default: false },


})

const validate = (user) => {
    const shcema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        isAdmin:Joi.boolean()

    })
    return shcema.validate(user)
}

userSchema.methods.generateToken = function () {
    let token = jwt.sign({ id: this.id, isAdmin: this.isAdmin }, 'some secret here');
    return token;
}

let User = mongoose.model("user", userSchema);

module.exports = {
    validate,
    User
}