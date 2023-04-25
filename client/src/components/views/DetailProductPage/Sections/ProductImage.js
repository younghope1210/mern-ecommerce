import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {

      // porps detail에 이미지가 있고 또 그 이미지가 1개 이상이라면
        if (props.detail.images && props.detail.images.length > 0) {
            
          let images = []

          // map으로 돌려서 images에 배열로 push 

            // eslint-disable-next-line array-callback-return
            props.detail.images.map(item => {
                images.push({ 
                    original: `${item}`,
                    thumbnail: `${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}
export default ProductImage