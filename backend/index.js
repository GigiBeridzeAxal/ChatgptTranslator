const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const ConnectDB = require('./modules/ConnectDB')
dotenv.config()
app.use(cors({
    origin:'*'
   }))
app.use(express.json())
ConnectDB()

app.use('/' , require('./routes/UserRoute'))



app.listen(4000 , console.log("Server Succesfuly Launched"))