const {sequelize} = require('./models') 
//Express
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')//Cookies
app.use(cookieParser())
app.use(express.json())

const cors = require('cors');
const origin = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000" 
  : "http://localhost:3000"

app.use(
  cors({
    credentials: true,
    origin
  }),
);
const route = require('./routes/routes') //Routes
app.use(route) 

app.listen(5000,async () =>{
    console.log("loading...")
    await sequelize.authenticate()
    console.log("database connected")
})

