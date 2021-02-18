const  express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
const path = require('path')


//create a server
const app = express();
const Port = process.env.Port || 3000 ; 

app.use(express.static('public'));
app.get('/' , (req , res) => {
    res.render('home')
})
// set template engine

app.use(expressEjsLayouts);
app.set('views' , path.join(__dirname ,'/resources/views'))
app.set('view engine' , 'ejs')







app.listen(Port,() =>{
    console.log(`Server is listening to port number ${Port}`);
})