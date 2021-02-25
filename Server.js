
const dotenv = require('dotenv')
const express = require('express');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const Port = process.env.Port || 3000 ; 
const passpoer = require('passport')
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const MongoDbStore = require('connect-mongo')(session)

// configure env
dotenv.config()


//database connection

const url = 'mongodb://localhost/pizza';
mongoose.connect( url, {useNewUrlParser:true ,useCreateIndex:true , useUnifiedTopology : true ,/*  useFindAndModidfy:true */});
 
const connection = mongoose.connection ;


connection.once('open' , () =>{

    console.log('database connected.....')
}
).catch(err =>{

    console.log('Database connection failed...')
})

//passport config

const passportInit = require('./app/config/passport')

passportInit(passport)
app.use(passport.initialize())

app.use(passport.session())



//session store
let mongoStore = new MongoDbStore( {

    mongooseConnection: connection , 

    collection : 'sessions'
})


 //session

 app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000 * 60 *60*24 } //24 hours
}))
app.use(flash()) 
 


// set template engine

app.use(express.static('public'));

app. use(express.json()); 

app.use(express.urlencoded({extended :false}));

 //global middlware

app.use((req ,res , next ) => {
  res.locals.session = req.session 
  next ()
})
 
app.use(expressEjsLayouts);

app.set('views' , path.join(__dirname ,'/resources/views'))

app.set('view engine' , 'ejs')

//route
require('./routes/web')(app)

app.listen(Port,() =>{
    console.log(`Server is listening to port number ${Port}`);
})

// yarn dev
