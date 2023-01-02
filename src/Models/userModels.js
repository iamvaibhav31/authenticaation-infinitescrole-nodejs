const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true
     },
     comfirm_Password: {
          type: String,
          required: true
     }

})

userSchema.set('toJSON', {
     transform: (document, returnObject) => {
          returnObject.id = returnObject._id.toString();
          delete returnObject._id;
          delete returnObject.__v;
          delete returnObject.password;
          delete returnObject.Comfirm_Password;
     }
})

userSchema.plugin(uniqueValidator, { message: "Email is already in used" })


const users = mongoose.model('users', userSchema)


module.exports = users

