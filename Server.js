
const dotenv = require('dotenv')
const express = require('express');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const Port = process.env.Port || 3000 ; 

const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');

// configure env
dotenv.config()

//create a server





//database connection

const url = 'mongodb://localhost/pizza';
mongoose.connect( url, {useNewUrlParser:true ,useCreateIndex:true , useUnifiedTopology : true ,/*  useFindAndModidfy:true */});
 
const connection = mongoose.connection ;


connection.once('open' , () =>{
    console.log('database connected.....')
}).catch(err =>{
    console.log('Database connection failed...')
})

 //session

 app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000 * 60 * 60  * 24  }
}))
app.use(flash ()) 
 

// set template engine

app.use(express.static('public'));

app.use(expressEjsLayouts);

app.set('views' , path.join(__dirname ,'/resources/views'))

app.set('view engine' , 'ejs')

//route
require('./routes/web')(app)


// add session middleware
/* app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
)
 */
// routes
/* app.get('/', (req, res) => {
  res.render('home')
})
 */
app.listen(Port,() =>{
    console.log(`Server is listening to port number ${Port}`);
})

// yarn dev
