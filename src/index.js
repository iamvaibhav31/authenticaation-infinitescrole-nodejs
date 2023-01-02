const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbconfig = require('./Config/DBconfig')

const auth = require('./Middlewares/auth')
const error = require('./Middlewares/error')

const unless = require('express-unless')


const app = express()
app.use(cors())

mongoose.connect(dbconfig.db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(
     () => {
          console.log("......... DATABASE IS CONNECTED .........")
     },
     (error) => {
          console.log("Database can't be connected: ", error)
     }
)


app.use(express.json())


app.use("/users", require('./Routes/usersRoutes'))

app.use(error.errorHandler)


app.listen(4000, function () {
     console.log("......... SERVER STARTED ......... ")
})

