const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
     const authHeader = req.headers["authorization"]

     const token = authHeader && authHeader.split(" ")[1] // Bearer <-|-access_tokens-|->

     jwt.verify(token, 'access', function (err, user) {
          if (err) {
               return res.sendStatus(403)
          }

          req.user = user;
          next()
     })

}

function generateAccessToken(emails) {
     return jwt.sign({ data: emails }, 'access', {
          expiresIn: 86400
     })
}

module.exports = {
     authenticateToken,
     generateAccessToken
}