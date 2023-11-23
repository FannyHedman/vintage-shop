import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleRemoveClick = (itemId) => {
    removeFromCart(itemId);
  };

  const emptyCart = () => {
    clearCart();
  };

  const itemCounts = cartItems.reduce((map, item) => {
    const { id } = item;
    map[id] = (map[id] || 0) + 1;
    return map;
  }, {});

  const uniqueItems = [...new Set(cartItems.map((item) => item.id))];

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {uniqueItems.map((itemId) => (
              <div key={itemId}>
                <CartList>
                  {
                    cartItems.find(
                      (item) => item.id === itemId
                    ).name
                  }{' '}
                  -{' '}
                  {
                    cartItems.find(
                      (item) => item.id === itemId
                    ).price
                  }{' '}
                  (Quantity: {itemCounts[itemId]})
                </CartList>
                <button
                  onClick={() => handleRemoveClick(itemId)}
                >
                  Remove from cart
                </button>
              </div>
            ))}
          </ul>
          <Button onClick={emptyCart}>Empty cart</Button>
          <Link to="/checkout">
            <Button>Proceed to Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CartDropdown;

const CartList = styled.li`
  list-style-type: none;
`;

const Button = styled.button``;
