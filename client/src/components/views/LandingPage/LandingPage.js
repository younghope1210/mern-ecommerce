import React, { useState, useEffect } from 'react'
import SearchFeature from './Sections/SearchFeature';
import {Col, Card, Row}  from 'antd';

import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import './LandingPage.css';


function LandingPage() {



  const [Product, setProduct] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerm, setSearchTerm] = useState("")


  useEffect(() => {

    let body = {
    
      skip:Skip,
      limit:Limit

    }
  
    getProducts(body);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  

  const getProducts = (body) => {
    axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success) {
                if(body.loadMore) {
                    setProduct([...Product, ...response.data.productInfo])
                } else {
                    setProduct(response.data.productInfo)
                }
                setPostSize(response.data.postSize)

            } else {
                alert("상품들을 가져오는데 실패하였습니다.")
            }
        })


}

// 상품 더보기 버튼

const loadMoreHandler = () => {

  let skip = Skip + Limit;

  let body = {
    
    skip:skip, // skip = Skip + Limit; <-  useState Skip이 아닌 Skip + Limit를 더한 값을 보냄
    limit:Limit,
    loadMore: true

  }


  getProducts(body)
  setSkip(skip)

}





 // 상품 출력

 const renderCards = Product.map((product, index) => {

  console.log('product', product)

  return <Col lg={6} md={8} xs={24} key={index} >
 
  <Card  
    cover={<a href={`/product/${product._id}`} > <img src={`${product.images[0]}`} style={{width:'100%'}} alt="" /> </a>}
    className='CardInfo'
  >
 
      <Meta
          title={product.title}
          description={`$${product.price}`}
      />
  </Card>
   
</Col>
})

// 검색기능 ========================================


const updateSearchTerm =(newSearchTerm) => {

  

  let body = {
    skip: 0,
    limit: Limit,
    searchTerm: newSearchTerm
  }
  setSkip(0)
  setSearchTerm(newSearchTerm) // SearchFeature.js 에서 받아옴
  getProducts(body)
}

//==================================================





  return (
    <div style={{width:'100%', margin: '0 auto'}}  >
    <div className='Hero'>
      Make the pollen blow out Make the firecrackers louder
    </div>

      <div style={{width:'80%', margin: '3rem auto'}}>
   
    {/* Search */}
    <div>
       <SearchFeature 
          refreshFunction={updateSearchTerm}
       />
    </div>


  {/* 추천 영상 배너 출력 */}



  <div className='ImgCon'> 
    
    <div>
      <img src="https://cdn.pixabay.com/photo/2020/01/20/22/55/bush-4781627_960_720.jpg" style={{width:'100%'}} alt="" />
      <p>봄의 시작을 당신으로부터</p>
    </div>
    <div>
      <img src="https://cdn.pixabay.com/photo/2021/05/11/05/57/men-6245003_960_720.jpg" style={{width:'100%'}} alt="" />
      <p> 깔끔하고 상쾌한 분위기를 표현해주는 향수 </p>
    </div>
    <div>
      <img src="https://cdn.pixabay.com/photo/2021/05/19/14/31/dandelion-6266231_960_720.jpg " style={{width:'100%'}} alt="" />
      <p>은은하게 물들이는 향기</p>
    </div>

        
 </div>



      <div style={{ textAlign:"center"}}>
        <h2 style={{ marginBottom:'50px'}}> <span style={{display:'inline-block', transform:'rotate(-17deg)', marginRight:'3px', fontSize:'30px'}}>R</span>ecommendation </h2>

        {/* filter */}


        {/* Cards  */}

        {/* 상품 출력  */}
    
        <Row gutter={[16, 16]}>
            {renderCards}
        </Row>
       

      </div>


{PostSize >= Limit &&
      <div style={{ display:'flex', justifyContent: 'center'}}>

        <button
          style={{ backgroundColor:'#ff4d4f', border:'0', color:'white',  padding:'20px', marginTop:'50px'}}
          onClick={loadMoreHandler}
        > 
             Product Views +
        </button>

      </div>
}

    </div>
  </div>
  )
}

export default LandingPage