const User = require("../../models/user")

const bcrypt = require('bcrypt')

/* const User = require('../models/user.js') */
 const authController = () => {
    return {
        login(req , res) {
           res.render('auth/login')
        },

         postLogin(req , res , next) {

            password.authentication('local' , (err , user , info ) => {

                if(err){
                    req.flash('error' ,info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error' ,info.message)
                }
            })

         },



        register(req ,res ){
            res.render('auth/register')
        },


        async postRegister(req ,res){

            const { name , email, password } = req.body 
            //validation request 

            if( !name || !email || !password ){
                  req.flash('error','All field required')
                  req.flash('name' , name)
                  req.flash('email', email)
                  return res.redirect('/register')
                  
            }
            //email exist 

            User.exists({ email : email } , ( err , result) =>{
                if(result){
                    req.flash('error' , 'Email already exists')
                    req.flash('name' , name)
                    return res.redirect('/register')
                    
                }
            })
            //encripting password
            const bcryptPassword = await bcrypt.hash( password , 10)

            //create User

            const user = new User({
                    //Both are same
               name ,     // name : name ,

               email ,    //email : email,

               password: bcryptPassword 
            })
            .save()

            . then(result => {
               //login 

              return res.redirect('/')
              
            }
                /* await res.flash('sucess' , 'registed sucessfully ')
                */
                )

            .catch(err => res.flash('error' ,'Oops something went wrong'))
            
            
        }
    }
 }

 module.exports = authController ;