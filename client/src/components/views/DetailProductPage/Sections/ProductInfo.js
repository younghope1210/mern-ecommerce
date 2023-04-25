import React from 'react'
import {  Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart} from '../../../../_actions/user_actions';
 
function Productinfo(props) {


    const dispatch = useDispatch();

    const addToCarthandler = () => {

        // 필요한 정보를 cart필드에 넣어준다

        dispatch(addToCart(props.detail._id));

        console.log(props.detail._id)


    }
 


  
  return (
    <div>
    <Descriptions title="Product Info" >
        <Descriptions.Item label="Price"> {props.detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="View"> {props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description"> {props.detail.description}</Descriptions.Item>
    </Descriptions>

    <br />
    <br />
    <br />
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button style={{ backgroundColor:'#ff4d4f', border:'0', color:'white',  padding:'15px 20px'}}
            onClick={addToCarthandler}
        >
            Add to Cart
            </button>
    </div>
</div>
  )
}

export default Productinfo