import React,{ useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import UserCardBlock from "./Sections/UserCardBlock";
import { 
           getCartItems,
           removeCartItem
 } from '../../../_actions/user_actions';

 import { Empty } from'antd';


function CartPage(props) {


    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)



    useEffect(() => {

        let cartItems = [];
    
        //리덕스 User State안에 cart안에 상품이 들어있는지 확인
   if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
            cartItems.push(item.id)
        });
    

               dispatch(getCartItems(cartItems, props.user.userData.cart))
               .then(response => {calculateTotal(response.payload) })

               // .then(response => { console.log(response) })
               //  console.log(props.user.userData.cart);
               
            }
        }
    }, [dispatch, props.user.userData])



  let calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      
      return total += parseInt(item.price,10) * item.quantity
    
    })
    setTotal(total)
    setShowTotal(true)
  }


  // 카트에 담긴 상품 삭제

  let removeFromCart = (productId) => {

    dispatch(removeCartItem(productId))
    .then(response => {
        if(response.payload.productInfo.length <= 0) {
          setShowTotal(false)
        }
    })
  }




    
  return (


    <div style={{ width:'80%', margin:'3rem auto'}}>

        <h2 style={{marginBottom:'20px'}}>My Cart</h2>

             {/* 카트 디테일 페이지가 있다면 카트 디테일의 프로덕트를 뿌린다 */}
            <div>
              <UserCardBlock 
                  products={props.user.cartDetail} 
                  removeItem={removeFromCart}
              />
            </div>

                  {/* 상품가격 출력 */}

                  {ShowTotal ? 
                    <div style={{ marginTop: '3rem'}}>
                      <h2>결제 금액 : ￦{Total}</h2>
                    </div>
                    :
                    <>
                    <br />
                    <Empty description={false} />
                    </>
                }
      

    </div>

  )
}

export default CartPage