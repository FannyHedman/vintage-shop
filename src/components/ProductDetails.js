import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { useCart } from '../context/CartContext';


const ProductDetails = ({ jsonData }) => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { addToCart } = useCart();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/product.json`)
                const data = response.data

                const foundProduct = data.find((item) => item.id === id)
                setProduct(foundProduct)
            } catch (error) {
                console.error('Error fetching JSON data:', error)
            }
        }

        fetchData()
    }, [id])

    const handleAddToCart = () => {
      addToCart(product);
    };

    if (!product) {
        return <div>There was an error fetching products</div>
    }

    return (
        <div style={{}}>
            <PageContainer>
                <ImageContainer>
                    <ProductImage src={product.largeImage}></ProductImage>
                </ImageContainer>
                <CardContainer>
                    <ProductCard>
                        <h2>{product.name}</h2>
                        <p>{product.info}</p>
                        <p>more information</p>
                        <CartButton onClick={handleAddToCart}>Add to Cart</CartButton>
                        <IconsContainer>
                            <Icon>&#10084;</Icon>
                        </IconsContainer>
                    </ProductCard>
                </CardContainer>
            </PageContainer>
        </div>
    )
}

export default ProductDetails

const PageContainer = styled.div`
    display: flex;
    /* margin: 0; */
`

const ImageContainer = styled.div`
    flex: 1;
    margin: 0 5%;
`

const ProductImage = styled.img`
    height: 80%;
    width: 100%;
    object-fit: cover;
`

const CardContainer = styled.div`
    flex: 1;
    margin: 0 5%;
`

const ProductCard = styled.div``

const IconsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CartButton = styled.button``

const Icon = styled.span`
    font-size: 30px;
    cursor: pointer;
    margin-left: 5%;
`
