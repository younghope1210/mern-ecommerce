import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

import { Row, Col } from 'antd';



function DetailProductPage(props) {
    // <Route exact path="/product/:productId" element={<AuthDetailProductPage />} />
    // const productId = props.match.params.productId <-- 라우트 업데이트된 후로 못쓴다
    // useParams를 사용할 때라도 props는 선언해줘야한다
    // 그렇지 않으면 data를 못 읽어들인다


    const { productId } = useParams();
    
    const [Product, setProduct] = useState({})

    useEffect(() => {

        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
            
                setProduct(response.data[0])
                // setProduct(response.data.product[0])

            })
            .catch(err => alert(err))
    }, [productId])
    


    


    
  return (
    
    <div style={{ maxWidth:'80%', margin:'2rem auto'}}>

        <div style={{ display:'flex', justifyContent:'center'}}>

                <h1 style={{marginBottom:'2rem'}}>{Product.title}</h1>


        </div>
   
        <Row gutter={[16, 16]} >
            <Col lg={12} xs={24}>
                <ProductImage detail={Product} />
            </Col>    
            <Col lg={12} xs={24}>
                <ProductInfo detail={Product} />
            </Col>
        </Row>
    </div>
  )
}

export default DetailProductPage