// import React from 'react';
// import styled from 'styled-components';
// import { useSaveItems } from '../context/SaveContext';
// const LikedItems = () => {
//   const { savedItems, removeSavedItem } = useSaveItems();

//   const handleRemoveClick = (itemId) => {
//     removeSavedItem(itemId);
//   };

//   return (
//     <div>
//       <h3>Liked Items</h3>
//       {savedItems.length === 0 ? (
//         <p>You haven't liked any items yet.</p>
//       ) : (
//         <ul>
//           {savedItems.map((item) => (
//             <div key={item.id}>
//               <LikedItemsList>
//                 {item.name} - {item.price} SEK
//               </LikedItemsList>
//               <button onClick={() => handleRemoveClick(item.id)}>
//                 Remove from liked items
//               </button>
//             </div>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LikedItems;

// const LikedItemsList = styled.li`
//   list-style-type: none;
// `;

import React from 'react'
import styled from 'styled-components'
import { primaryColor, secondaryColor, textColor } from '../styles/colors'
import { useSaveItems } from '../context/SaveContext'
import { Link } from 'react-router-dom'

const LikedItems = ({ jsonData }) => {
    const { savedItems, removeSavedItem } = useSaveItems()

    const handleRemoveClick = (itemId) => {
        removeSavedItem(itemId)
    }

    return (
        <PageContainer>
            {savedItems.length === 0 ? (
                <EmptyMessage>You haven't liked any items yet.</EmptyMessage>
            ) : (
                <div>
                    <LikedHeader>These are your favorite socks</LikedHeader>
                    <CardContainer>
                        {savedItems.map((item, index) => (
                            <ProductCard key={index}>
                                <Link to={`/productdetails/${item.id}`}>
                                    <ProductImage
                                        src={item.smallImage}
                                        alt={item.name}
                                    />
                                </Link>
                                <StyledLink to={`/productdetails/${item.id}`}>
                                    <ProductName>{item.name}</ProductName>
                                </StyledLink>
                                <ProductPrice>{item.price} SEK</ProductPrice>
                                <IconsContainer>
                                    <Icon
                                        onClick={() =>
                                            handleRemoveClick(item.id)
                                        }
                                    >
                                        &#10084;
                                    </Icon>
                                </IconsContainer>
                            </ProductCard>
                        ))}
                    </CardContainer>
                </div>
            )}
        </PageContainer>
    )
}

export default LikedItems

const LikedHeader = styled.h3`
    text-align: center;
    color: ${textColor};
    font-weight: normal;
    margin-bottom: 50px;
`

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
`

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
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
    color: red;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.3);
    }
`

const EmptyMessage = styled.p`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-top: 50px;
`
