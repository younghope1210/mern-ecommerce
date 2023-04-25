import React,{ useState } from 'react';
import { Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const { TextArea } = Input;



const Continents = [
    { key: 1, value: "france" },
    { key: 2, value: "germany" },
    { key: 3, value: "italy" },
    { key: 4, value: "america" },
    { key: 5, value: "korea" },
    { key: 6, value: "spain" },
    { key: 7, value: "united kingdom" }
]




function UploadProductPage(props) {


     // 페이지 넘김
 const navigate = useNavigate();



    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])


    // 타이틀 입력
    const onTitleChange = (e) => {

        setTitle(e.currentTarget.value)

    }

    // 상품 상세정보 입력

    const onDescriptionChange = (e) => {

        setDescription(e.currentTarget.value)

    }

// 상품 가격 입력

    const onPriceChange = (e) => {

        setPrice(e.currentTarget.value)

    }


    // 상품 옵션 선택란

    const onContinentsSelectChange = (e) => {

        setContinent(e.currentTarget.value)
        
    }


    const updateImages = (newImages) => {


        setImages(newImages)

    }


    //서버에 상품 업로드 양식 전송하기

    const submitHandler = (e) => {

        e.preventDefault();

        //유효성 체크하기


        if (!Title|| !Description || !Price || !Continent|| !Images) {
            return alert('모든 값을 넣어주세요!!')
        }

        // 서버에 상품 업로드 양식을 request로 보내준다


        const variables = {

            // 로그인 된 사람의 id
            // hoc의 auth.js 파일의  user의 정보를 받아옴
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent,
        }



        Axios.post('/api/product', variables)

        .then(response => {
            if(response.data.success){  
                alert('상품 업로드에 성공했습니다')
                navigate('/')//메인페이지로 이동


            }else{
                alert('상품 업로드에 실패했습니다')
            }
        })
    }

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{ textAlign:'center', marginBottom:'2rem'}}>

                <h2 style={{marginBottom:'30px'}}>
                Product Upload 
                </h2>
                <FileUpload refreshFunction={updateImages} />
                {/*  상품 업로드 Input*/}

                <Form
                    onSubmit={submitHandler}
                >
                    <br />
                    <br />
                    <label>product name</label>
                    <Input  
                        onChange={onTitleChange} 
                        value={Title} 
                    /> 
                            
                    <br />
                    <br />
                    <label>description</label>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value={Description}
                    />
                    <br />
                    <br />
                    <label>price</label>
                    <Input
                         onChange={onPriceChange}
                         value={Price}
                         type="number"
                    />
                    <br />
                    <br />
                    <label>country of manufacture </label>
                    <select onChange={onContinentsSelectChange} value={Continent}>

                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>
                            {item.value}
                        </option>
                        
                    ))}

                        
                    
                    </select>
                    <br />
                    <br />
                    <button
                        onClick={submitHandler}
                        style={{ backgroundColor:'#333', border:'0', color:'white',lineHeight:'30px', lineheight:'30px', padding:'5px 30px'}}
                    >
                        Submit
                    </button>

                </Form>

              

        </div>
    </div>
    
  )
}

export default UploadProductPage