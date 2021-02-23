import Axios  from "axios";

let addToCart = document.querySelectorAll('.add-to-cart')


const updateCart = (pizza) => {
      Axios.post('/update-cart' , pizza)
       .then( res => console.log(res) ) 
       .catch(err => console.log(err) )
}
addToCart.forEach(btn =>{
    btn.addEventListener('click' , (e) =>{
       let pizza = JSON.parse (btn.dataset.pizza);
       /* console.log(pizza) */
       updateCart(pizza)
    
    })
})