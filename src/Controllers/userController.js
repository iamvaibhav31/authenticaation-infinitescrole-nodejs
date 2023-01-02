const bcryptjs = require('bcryptjs');

const userService = require('../Services/userService')


exports.register = (req, res, next) => {
     console.log(req.body)
     const { password, Comfirm_Password } = req.body
     const salt = bcryptjs.genSaltSync(10)
     console.log(password, Comfirm_Password)
     req.body.password = bcryptjs.hashSync(password, salt)
     req.body.Comfirm_Password = bcryptjs.hashSync(Comfirm_Password, salt)

     userService.register(req.body, (err, result) => {
          if (err) {
               return next(err)
          }

          return res.status(200).send({
               success: 'true',
               data: result
          })
     })
}


exports.login = (req, res, next) => {

     const { email, password } = req.body
     console.log(req.body)

     userService.login({ email, password }, (err, result) => {
          if (err) {
               return next(err)
          }

          return res.status(200).send({
               success: 'true',
               data: result
          })
     })
}


exports.userProfile = (req, res, next) => {
     userService.userprofile({ params: req.params['id'], data: req.user.data }, (err, result) => {
          if (err) {
               return next(err)
          }

          return res.status(200).send({
               success: 'true',
               message: "Authorized Users",
               data: result
          })
     })
}

