// BEMÆRK PORT 8000 på thinkpad


// HUSK MIG INDEN PUSH TIL HEROKU !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// HUSK DEV i .env

//const inDevelopmentMode = true
// HUSK MIG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')  // loades vist ind automatisk nu og er dermed muligvis overflødig
// const { urlencoded } = require('body-parser')
const session = require('express-session')
const helmet = require("helmet")
const morgan = require('morgan')
const path = require('path')
const mongoose = require('mongoose')

const userFunctions = require('./userFunctions.js')
const userRouter = require('./userRouter.js')

const itemFunctions = require('./itemFunctions.js')
const itemRouter = require('./itemRouter.js')

const app = express()

const {address} = require('./util.js')

// de her er både her og i itemRouter, kan de sættes i en middleware

app.use(helmet());
app.use(express.json())
app.use(morgan('tiny'))

app.use(function (req, res, next) {
  console.log("Middleware")
  res.setHeader("Content-Security-Policy", `script-src 'self' ${address} https://nodeshoplistservertjldatkea.herokuapp.com/createItemEndpoint`)  //  https://apis.google.com til JQuery 
  // Husk address ikke indeholder createItemEndpoint endpointet, når inDevMode er sat til false
  return next()
})

// parse form data
//app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

const { createUserMongooseModel, createUser, getUsers, updateUser, removeOneUser, findUserIdByEmail, findUser, doesEmailExistInUserDatabase} = userFunctions

const { createItemMongooseModel, createItem, getItems, updateItem, removeManyItems, removeOneItem, makeFormForButtonToChangeItemsGroup } = itemFunctions

const {
    NODE_ENV,
    SESS_NAME,
    SESS_SECRET,
    SESS_LIFETIME
} = process.env

const PORT = (process.env.PORT || 8080)



const uri = `mongodb+srv://${process.env.DATABASEUSERNAME}:${process.env.DATABASEPASSWORD}@clusterformongodbexerci.dao5cc1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDb database'))
  .catch(err => {
    console.error('Could not connect to database', err)
    console.error(err)
    console.log('Could not connect to database')
    console.log(err)
  })  

const IN_PROD = NODE_ENV === 'production'

// create-User/Item-MongooseModel() er nød til at være der, så modellen er indlæst inden resten af funktionerne kan bruges    
let User = createUserMongooseModel(mongoose) // Bør denne sendes rundt mellem funktionerne fremfor at være en global variabel???
let Item = createItemMongooseModel(mongoose)

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        //originalMaxAge: process.env.SESS_LIFETIME, // måske som _expires i stedet for
        //maxAge: process.env.SESS_LIFETIME, // uden en max age bliver det til en session cookie, der slettes, når browseren lukkes
        sameSite: true, // 2 andre muligheder, deriblandt false, måske relevant ift CSP eller CORS
        secure: IN_PROD
    }
}))

app.use(userRouter)

app.use(itemRouter)

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})
