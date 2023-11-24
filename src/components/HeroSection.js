import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import heroImageWomen from '../assets/womenHeroImage.jpg'
import heroWomen from '../assets/womenHero1.jpg'
import { useSaveItems } from '../context/SaveContext'

const HeroSection = () => {
    const location = useLocation()

    const getImageForUrl = () => {
        // if (location.pathname === '/women') {
        //     return !heroWomen
        // }
        // if (location.pathname === '/men') {
        //     return heroWomen
        // }
        return heroWomen
    }

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/product.json')
                const data = await response.json()
                console.log(data)
                setProducts(data)
            } catch (error) {
                console.error('Error fetching JSON data:', error)
            }
        }

        fetchData()
    }, [])

    const [sortBy, setSortBy] = useState('price')
    const [sortOrder, setSortOrder] = useState('asc')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStyle, setSelectedStyle] = useState(null)

    const { addSavedItem, savedItems } = useSaveItems()

    const handleToggleSort = () => {
        setSortOrder((prevSortOrder) =>
            prevSortOrder === 'asc' ? 'desc' : 'asc'
        )
    }

    const handleColorFilter = (color) => {
        setSelectedColor(color === selectedColor ? null : color)
    }

    const handleResetColors = () => {
        setSelectedColor(null)
    }

    const handleStyleFilter = (style) => {
        setSelectedStyle(style === selectedStyle ? null : style)
    }

    const handleResetStyles = () => {
        setSelectedStyle(null)
    }

    const handleResetAllFilters = () => {
        setSelectedStyle(null)
        setSelectedColor(null)
    }

    const sortAndFilterData = (products) => {
        return products
            .filter((item) => item.gender === 'women' || 'men')
            .filter((item) =>
                selectedColor ? item.color === selectedColor : true
            )
            .filter((item) =>
                selectedStyle ? item.style === selectedStyle : true
            )
            .sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a[sortBy] - b[sortBy]
                } else {
                    return b[sortBy] - a[sortBy]
                }
            })
    }

    const sortedAndFilteredData = products
        ? sortAndFilterData([...products])
        : []

    const isItemLiked = (itemId) => {
        return savedItems.some((savedItem) => savedItem.id === itemId)
    }

    const handleSavedItem = (itemId) => {
        const selectedItem = products.find((item) => item.id === itemId)
        addSavedItem(selectedItem)
    }

    return (
        <PageContainer>
            {/* <CenteredContainer>
            {location.pathname === '/' && (
                <Link to="/women">
                    <OverlayLink>Explore our new women's collection</OverlayLink>
                </Link>
            )}
            <div>
                <img src={getImageForUrl()} alt="item-images" />
            </div>
        </CenteredContainer> */}
            <FilterContainer>
                <h4>Price</h4>
                <FilterButton onClick={handleToggleSort}>
                    {`${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                </FilterButton>
                <div>
                    <h4>Color:</h4>
                    <FilterButton
                        onClick={() => handleColorFilter('Pink')}
                        active={selectedColor === 'Pink'}
                        style={{ backgroundColor: 'pink' }}
                    >
                        Pink
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Yellow')}
                        active={selectedColor === 'Yellow'}
                        style={{ backgroundColor: 'yellow' }}
                    >
                        Yellow
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('White')}
                        active={selectedColor === 'White'}
                        style={{ backgroundColor: 'white' }}
                    >
                        White
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Black')}
                        active={selectedColor === 'Black'}
                        style={{ backgroundColor: 'black', color: 'white' }}
                    >
                        Black
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Green')}
                        active={selectedColor === 'Green'}
                        style={{ backgroundColor: '#03974F' }}
                    >
                        Green
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Blue')}
                        active={selectedColor === 'Blue'}
                        style={{ backgroundColor: '#3C8AE9' }}
                    >
                        Blue
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Purple')}
                        active={selectedColor === 'Purple'}
                        style={{ backgroundColor: '#BC99F7' }}
                    >
                        Purple
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleColorFilter('Orange')}
                        active={selectedColor === 'Orange'}
                        style={{ backgroundColor: '#E8994A' }}
                    >
                        Orange
                    </FilterButton>
                    <FilterButton onClick={handleResetColors}>All</FilterButton>
                </div>
                <div>
                    <h4>Style</h4>
                    <FilterButton
                        onClick={() => handleStyleFilter('casual')}
                        active={selectedStyle === 'casual'}
                    >
                        Casual
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleStyleFilter('sport')}
                        active={selectedStyle === 'sport'}
                    >
                        Sport
                    </FilterButton>
                    <FilterButton
                        onClick={() => handleStyleFilter('original')}
                        active={selectedStyle === 'original'}
                    >
                        Original
                    </FilterButton>
                    <FilterButton onClick={handleResetStyles}>All</FilterButton>
                </div>
                <h4>Reset filter</h4>
                <FilterButton onClick={handleResetAllFilters}>All</FilterButton>
            </FilterContainer>
            <CardContainer>
                {sortedAndFilteredData.map((item, index) => (
                    <ProductCard>
                        <Link key={index} to={`/productdetails/${item.id}`}>
                            <ProductImage
                                src={item.smallImage}
                                alt={item.name}
                            />
                        </Link>
                        <StyledLink
                            key={index}
                            to={`/productdetails/${item.id}`}
                        >
                            <ProductName>{item.name}</ProductName>
                        </StyledLink>
                        <ProductPrice>{item.price} SEK</ProductPrice>
                        <IconsContainer>
                            <Icon
                                onClick={() => handleSavedItem(item.id)}
                                liked={isItemLiked(item.id)}
                            >
                                &#10084;
                            </Icon>
                            {/* <Icon>&#128722;</Icon> */}
                        </IconsContainer>
                    </ProductCard>
                ))}
            </CardContainer>
        </PageContainer>
    )
}

export default HeroSection

// const FilterContainer = styled.div`
//     width: 200px;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     min-height: 100vh;
//     margin-left: 90px;
// `

// const FilterButton = styled.button`
//     background-color: ${({ active }) => (active ? 'lightgray' : 'white')};
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     padding: 5px 10px;
//     margin: 5px 5px 5px 5px;
//     cursor: pointer;

//     transition: transform 0.2s ease-in-out;

//     &:hover {
//         transform: scale(1.1);
//     }
// `

// const CenteredContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     /* height: auto; */
//     margin-top: 0px;
//     margin-bottom: 100px;
// `

// const OverlayLink = styled.div`
//     position: absolute;
//     padding: 10px;
//     background-color: rgba(255, 255, 255, 0.8);
//     text-decoration: none;
//     color: #000;
//     font-weight: bold;
//     font-size: 18px;
//     transition: background-color 0.3s;

//     &:hover {
//         background-color: rgba(255, 255, 255, 1);
//     }
// `

// const CardContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     max-width: 1000px;
//     margin: 0 auto;
//     width: 100%;
//     box-sizing: border-box;
// `

// const ProductCard = styled.div`
//     background-color: #fff;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     padding: 16px;
//     width: calc(33.33% - 20px);
//     margin: 0 10px 20px;
//     text-align: center;
//     box-sizing: border-box;
// `

// const ProductImage = styled.img`
//     max-width: 100%;
//     border-radius: 8px;
//     transition: transform 0.2s ease-in-out;

//     &:hover {
//         transform: scale(1.05);
//     }
// `

// const ProductName = styled.h5``

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: black;
// `

// const ProductPrice = styled.p`
//     color: #666;
//     margin: 10px 0;
// `

// const IconsContainer = styled.div`
//     display: flex;
//     justify-content: end;
// `

// const Icon = styled.span`
//     font-size: 20px;
//     cursor: pointer;
//     margin-left: 5%;
//     color: ${({ liked }) => (liked ? 'red' : 'pink')};

//     transition: transform 0.2s ease-in-out;

//   &:hover {
//     transform: scale(1.3);
//   }
// `


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
`

const FilterContainer = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 100vh;
    margin-left: 90px;
`

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    /* min-height: 100vh;  */
`

const ProductCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: calc(33.33% - 20px);
    margin: 0 10px 20px;
    text-align: center;
    box-sizing: border-box;
`

const ProductImage = styled.img`
    max-width: 100%;
    border-radius: 8px;

    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`
const ProductName = styled.h5``

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`

const ProductPrice = styled.p`
    color: #666;
    margin: 10px 0;
`

const IconsContainer = styled.div`
    display: flex;
    justify-content: end;
`

const Icon = styled.span`
    font-size: 20px;
    cursor: pointer;
    margin-left: 5%;
    color: ${({ liked }) => (liked ? 'red' : 'pink')};

    transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`

const FilterButton = styled.button`
    background-color: ${({ active }) => (active ? 'lightgray' : 'white')};
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;
    margin: 5px 5px 5px 5px;
    cursor: pointer;

    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`
