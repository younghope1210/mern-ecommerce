import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
}from './types';
          
export function loginUser(dataTosubmit){
    const request = Axios.post('/api/user/login', dataTosubmit)
    .then(response =>response.data)
          
    return {
        type: LOGIN_USER,
        payload : request
    }
}
          
export function registerUser(dataTosubmit){
    const request = Axios.post('/api/user/register', dataTosubmit)
    .then(response =>response.data)
          
    return {
        type: REGISTER_USER,
        payload : request
    }
}

export function auth(){
    const request = Axios.get('/api/user/auth')
    .then(response =>response.data)
          
    return {
        type: AUTH_USER,
        payload : request
    }
}

export function addToCart(id) {
  let body = {
      productId: id
  }

    const request = Axios.post('/api/user/addToCart', body)
    .then(response => response.data)
          
    return {
        type: ADD_TO_CART,
        payload : request
    }
}

export function getCartItems(cartItems, userCart){

  const request = Axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
  .then(response => {

          // CartItem들에 해당하는 정보들을 Product Collection에서 가져온후에
          // Quantity 정보를 넣어 준다
          userCart.forEach(cartItem => {

              response.data.forEach((productDetail, index) => {

                  if(cartItem.id === productDetail._id) {
                      response.data[index].quantity = cartItem.quantity
                  }
              })
          })
          return response.data; // user_reducer에 있는 get_cart_items action.payload로 들어감
   });

  return {
      type: GET_CART_ITEMS,
      payload: request
  }
}


  export function removeCartItem(productId){
    const request = Axios.get(`/api/user/removeFromCart?id=${productId}`)
    .then(response => {
      
      // productInfo, cart 정보를 조합해서 cartDetail을 만든다
      response.data.cart.forEach(item => {
        response.data.productInfo.forEach((product, index) => {
          if(item.id === product._id){
            response.data.productInfo[index].quantity = item.quantity
          }
        })
      })
      
      return response.data;

    });
          
    return {
        type: REMOVE_CART_ITEM,
        payload : request
    }
}

 


