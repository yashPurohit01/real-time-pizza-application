const path = require('path')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const dotenv = require('dotenv')

// configure env
dotenv.config()

// create a server
const app = express()

const PORT = process.env.Port || 3000

// set static folder -- for assets
app.use(express.static('public'))

// app.use(expressEjsLayouts)

// set views directory
app.set('views', path.join(__dirname, '/resources/views'))

// set template engine
app.set('view engine', 'ejs')

// add session middleware
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
)

// routes
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, () => {
  console.log(`Server is listening to port number ${PORT}`)
})
