import React from 'react'
import "./UserCardBlock.css"


function UserCardBlock(props) {

  const renderCartImage = (images) => {
    if (images.length > 0) { // 이미지가 0보다 많으면
        let image = images[0] // 첫번째 이미지만 끌고온다
        return `${image}`
    }
}


const renderItems = () => (
    props.products && props.products.map((product, index) => (
        <tr key={index}>
            <td>
                <img style={{ width: '70px' }} alt="product"
                    src={renderCartImage(product.images)} />
            </td>
            <td>
                {product.quantity} EA
            </td>
            <td>
                $ {product.price}
            </td>
            <td> 
                {/* cartpage.js에서 삭제버튼 받아온다 */}
                <button 
                    style={{ backgroundColor:'#ff4d4f', border:'0', color:'white',  padding:'5px 5px', marginLeft:'5px'}}
                    onClick={() => props.removeItem(product._id)}>
                    상품삭제
                </button>
            </td>
        </tr>
    ))
)




  return (
    
    
    <div>

        <table>
          <thead style={{fontWeight:'normal', fontSize:'0.9em'}}>
          <tr>
              <th>Product Images</th>
              <th>Product Quantity</th>
              <th>Product Price</th>
              <th>Product from Cart</th>
            </tr>
          </thead>
          <tbody style={{fontSize:'12px'}}>
              {renderItems()}
          </tbody>
        </table>

    </div>


  )
}

export default UserCardBlock