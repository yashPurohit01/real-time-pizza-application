import Axios  from "axios";

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

const updateCart = (pizza) => {
      Axios.post('/update-cart' , pizza)
       .then( res => {
           console.log(res) 
           cartCounter.innerText  = res.data.total_Quantity;
        }) 
       .catch(err => console.log(err) )

     
}
addToCart.forEach(btn =>{
    btn.addEventListener('click' , (e) =>{
       let pizza = JSON.parse (btn.dataset.pizza);
       updateCart(pizza)
    
    })
})