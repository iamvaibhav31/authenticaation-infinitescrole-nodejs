const users = require('../Models/userModels')

const bcryptjs = require('bcryptjs');
const auth = require('../Middlewares/auth')


async function login({ email, password }, callback) {
     const user = await users.findOne({ email });
     if (user != null) {
          if (bcryptjs.compareSync(password, user.password)) {
               const token = auth.generateAccessToken(user)
               return callback(null, { ...user.toJSON(), token })
          } else {
               return callback({
                    message: "Invalid Email and Password"
               })
          }

     } else {
          return callback({
               message: "Invalid Email and Password"
          })
     }
}


async function register(params, callback) {

     const user = new users(params)
     user.save().then((response) => {


          return callback(null, response)
     }).catch((err) => {
          return callback(err)
     })
}



module.exports = {
     login,
     register,

}