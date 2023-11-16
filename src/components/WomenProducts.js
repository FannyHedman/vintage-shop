import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'

const WomenProducts = ({ jsonData }) => {
    const location = useLocation()
    // const [jsonData, setJsonData] = useState(null)
    const [sortBy, setSortBy] = useState('price')
    const [sortOrder, setSortOrder] = useState('asc')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStyle, setSelectedStyle] = useState(null)

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

    const sortAndFilterData = (data) => {
        return data
            .filter((item) => item.gender === 'women')
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

    const sortedAndFilteredData = jsonData
        ? sortAndFilterData([...jsonData])
        : []

    return (
        <PageContainer>
            <FilterContainer>
                <h4>Price</h4>
                <FilterButton onClick={handleToggleSort}>
                    {`${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                </FilterButton>
                <div>
                    <h4>Color:</h4>
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
                            <Icon>&#10084;</Icon>
                            <Icon>&#128722;</Icon>
                        </IconsContainer>
                    </ProductCard>
                ))}
            </CardContainer>
        </PageContainer>
    )
}

export default WomenProducts

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

    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`

const ProductImage = styled.img`
    max-width: 100%;
    border-radius: 8px;
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
