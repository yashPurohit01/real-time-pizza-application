const homeController = require('../app/http/controllers/homeController.js')
const  authController = require('../app/http/controllers/authController.js')
const cartController = require('../app/http/controllers/cartController.js')
const initRoutes = (app) => {
    
    app.get('/' , homeController().index)

    app.get('/cart' ,   cartController().cart)


     app.get('/login' , authController().login)
     
  

     app.get('/register' , authController().register)
     
    
} 

module.exports = initRoutes;