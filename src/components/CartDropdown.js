// // import React from 'react';
// // import styled from 'styled-components';
// // import { useCart } from '../context/CartContext';
// // import { Link } from 'react-router-dom';

// // const CartDropdown = () => {
// //   const { cartItems, removeFromCart, clearCart } = useCart();

// //   const handleRemoveClick = (itemId) => {
// //     removeFromCart(itemId);
// //   };

// //   const emptyCart = () => {
// //     clearCart();
// //   };

// //   const itemCounts = cartItems.reduce((map, item) => {
// //     const { id } = item;
// //     map[id] = (map[id] || 0) + 1;
// //     return map;
// //   }, {});

// //   const uniqueItems = [...new Set(cartItems.map((item) => item.id))];

// //   return (
// //     <div>
// //       {cartItems.length === 0 ? (
// //         <p>Your cart is empty</p>
// //       ) : (
// //         <>
// //           <ul>
// //             {uniqueItems.map((itemId) => (
// //               <div key={itemId}>
// //                 <CartList>
// //                   {
// //                     cartItems.find(
// //                       (item) => item.id === itemId
// //                     ).name
// //                   }{' '}
// //                   -{' '}
// //                   {
// //                     cartItems.find(
// //                       (item) => item.id === itemId
// //                     ).price
// //                   }{' '}
// //                   (Quantity: {itemCounts[itemId]})
// //                 </CartList>
// //                 <button
// //                   onClick={() => handleRemoveClick(itemId)}
// //                 >
// //                   Remove from cart
// //                 </button>
// //               </div>
// //             ))}
// //           </ul>
// //           <Button onClick={emptyCart}>Empty cart</Button>
// //           <Link to="/checkout">
// //             <Button>Proceed to Checkout</Button>
// //           </Link>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default CartDropdown;

// // const CartList = styled.li`
// //   list-style-type: none;
// // `;

// // const Button = styled.button``;

// // CartDropdown.jsx
// import React from 'react'
// import styled from 'styled-components'
// import { useCart } from '../context/CartContext'
// import { Link } from 'react-router-dom'

// const CartDropdown = () => {
//     const { cartItems, removeFromCart, clearCart } = useCart()

//     const handleRemoveClick = (itemId) => {
//         removeFromCart(itemId)
//     }

//     const emptyCart = () => {
//         clearCart()
//     }

//     const itemCounts = cartItems.reduce((map, item) => {
//         const { id } = item
//         map[id] = (map[id] || 0) + 1
//         return map
//     }, {})

//     const uniqueItems = [...new Set(cartItems.map((item) => item.id))]

//     return (
//         <DropdownContainer>
//             {/* <CartHeader>Cart</CartHeader> */}
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty</p>
//             ) : (
//                 <>
//                     <CartItemsContainer>
//                         {uniqueItems.map((itemId) => (
//                             <div key={itemId}>
//                                 <CartList>
//                                     {
//                                         cartItems.find(
//                                             (item) => item.id === itemId
//                                         ).name
//                                     }{' '}
//                                     -{' '}
//                                     {
//                                         cartItems.find(
//                                             (item) => item.id === itemId
//                                         ).price
//                                     }{' '}
//                                     :- ({itemCounts[itemId]})
//                                 </CartList>
//                                 <button class="bi bi-trash"
//                                     onClick={() => handleRemoveClick(itemId)}
//                                 >
//                                     &#128465;
//                                 </button>
//                             </div>
//                         ))}
//                     </CartItemsContainer>
//                     <ButtonContainer>
//                         <Button onClick={emptyCart}>Empty cart</Button>
//                         <Link to="/checkout">
//                             <Button>Proceed to Checkout</Button>
//                         </Link>
//                     </ButtonContainer>
//                 </>
//             )}
//         </DropdownContainer>
//     )
// }

// export default CartDropdown

// const DropdownContainer = styled.div`
//     position: absolute;
//     top: 40px;
//     left: 50%; /* Adjust this value to control the horizontal position */
//     transform: translateX(-70%);
//     background-color: white;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//     padding: 10px;
//     z-index: 1;
//     width: 200px;
//     /* display: ${({ isVisible }) =>
//         isVisible ? 'block' : 'none'}; Add visibility logic */
// `

// const CartHeader = styled.h3`
//     margin: 0;
//     cursor: pointer;
//     color: black;
// `

// const CartItemsContainer = styled.div`
//     width: 100%;
//     align-items: center;
// `

// const CartList = styled.p`
//     list-style-type: none;
//     width: 100%;
//     color: black;
//     font-size: 16px;
// `

// // const ButtonContainer = styled.div`
// //   display: flex;
// //   justify-content: space-between;
// //   margin-top: 10px;
// // `;

// // const Button = styled.button`
// //   background-color: #007bff;
// //   color: #fff;
// //   padding: 8px 12px;
// //   border: none;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   transition: background-color 0.3s;

// //   &:hover {
// //     background-color: #0056b3;
// //   }
// // `;

// const ButtonContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: start; /* Center buttons horizontally */
//     position: relative; /* Position relative for absolute positioning */
//     margin-top: 40px; /* Add some top margin for better separation */
// `

// const Button = styled.button`
//     margin-bottom: 10px; /* Add some bottom margin for better separation */
// `


import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveClick = (itemId, event) => {
    event.stopPropagation();
    removeFromCart(itemId);
  };

  const emptyCart = (event) => {
    event.stopPropagation();
    clearCart();
  };

  const itemCounts = cartItems.reduce((map, item) => {
    const { id } = item;
    map[id] = (map[id] || 0) + 1;
    return map;
  }, {});

  const uniqueItems = [...new Set(cartItems.map((item) => item.id))];

  // Calculate the total sum of items in the cart
  const totalSum = cartItems.reduce((sum, item) => {
    // Convert item.price to a number before adding to the sum
    return sum + Number(item.price);
  }, 0);

  return (
    <DropdownContainer>
      {cartItems.length === 0 ? (
        <EmptyCartMsg>Your cart is empty</EmptyCartMsg>
      ) : (
        <>
          <CartItemsContainer>
            {uniqueItems.map((itemId) => (
              <div key={itemId}>
                <CartList>
                  {cartItems.find((item) => item.id === itemId).name} -{' '}
                  {cartItems.find((item) => item.id === itemId).price}:- (
                  {itemCounts[itemId]})
                </CartList>
                <button
                  onClick={(event) => handleRemoveClick(itemId, event)}
                >
                  &#128465;
                </button>
              </div>
            ))}
          </CartItemsContainer>
          <TotalSum>Total: {totalSum.toFixed(2)}</TotalSum>
          <ButtonContainer>
            <Button style={{ backgroundColor: 'lightgrey' }} onClick={(event) => emptyCart(event)}>
              Clear cart
            </Button>
            <Link to="/checkout">
              <Button>Checkout</Button>
            </Link>
          </ButtonContainer>
        </>
      )}
    </DropdownContainer>
  );
};

export default CartDropdown;

const DropdownContainer = styled.div`
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-70%);
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 10px;
    z-index: 1;
    width: 200px;
`;

const EmptyCartMsg = styled.p`
color: black;
font-size: 16px;
`

const CartHeader = styled.h3`
    margin: 0;
    cursor: pointer;
    color: black;
`;

const CartItemsContainer = styled.div`
    width: 100%;
    align-items: center;
`;

const CartList = styled.p`
    list-style-type: none;
    width: 100%;
    color: black;
    font-size: 14px;
`;

const TotalSum = styled.p`
color: black;`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    margin-top: 40px;
`;

const Button = styled.button`
    background-color: green;
    border: none;
    color: white;
    padding: 5px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    width: 200px;
`;
