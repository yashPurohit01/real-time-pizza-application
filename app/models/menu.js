const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
     name:{type:String , require:true},
     image:{type:String , require:true},
     size:{type:String , require:true}, 
     price:{type:Number , require:true},
})

const Menu = mongoose.model('Menu' , menuSchema)

module.exports  = Menu;