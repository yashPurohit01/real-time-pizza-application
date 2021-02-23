const cartController = () =>{
    return{
        cart(req , res){
           res.render('customer/cart')
        },
        update(req ,res){
            if(!req.session.cart){
                req.session.cart = {
                    items:{},
                    total_Quantity:0,
                    total_Price:0,
                }   
/* 
                console.log(req.body) */
            }
             let cart = req.session.cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body ,
                    quantity:1 ,
                }
                cart.total_Quantity = cart.total_Quantity + 1 
                cart.total_Price = cart.total_Price + req.body.price 
            } 

            else{
                cart.items[req.body._id].quantity = cart.items[req.body._id].quantity + 1;
                cart.total_Quantity = cart.total_Quantity + 1 ;
                cart.total_Price = cart.total_Price + req.body.price;
            }
            return res.json({
                total_Quantity: req.session.cart.total_Quantity ,
               totalPrice : req.session.cart.total_Price ,
                totalitems : req.session.cart.items 
            })
        }
    }
}

module.exports  =  cartController ;