import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'

const CheckOut = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [formData, setFormData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
    clearCart();
  };

  const handleRemoveClick = (itemId) => {
    removeFromCart(itemId);
  };


  const itemCounts = cartItems.reduce((map, item) => {
    const { id } = item;
    map[id] = (map[id] || 0) + 1;
    return map;
  }, {});


  const uniqueItems = [...new Set(cartItems.map((item) => item.id))];

  return (
    <div>
      {showConfirmation ? null : (
        <>
          <CartItemsDiv>
            <h3>Cart</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {uniqueItems.map((itemId) => (
                  <div key={itemId}>
                    <ItemsList>
                      {cartItems.find((item) => item.id === itemId).name} - {cartItems.find((item) => item.id === itemId).price} (Quantity: {itemCounts[itemId]})
                    </ItemsList>
                    <button onClick={() => handleRemoveClick(itemId)}>Remove</button>
                  </div>
                ))}
              </ul>
            )}
          </CartItemsDiv>
        </>
      )}
      <div>
        {showConfirmation ? (
          <div>
            <h2>Thank you for your purchase!</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" onChange={handleInputChange} required />
            </label>
            <label>
              Address:
              <input type="text" name="address" onChange={handleInputChange} required />
            </label>
            <label>
              Billing Information:
              <input type="text" name="billingInfo" onChange={handleInputChange} required />
            </label>
            <button type="submit">Purchase</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckOut;

const CartItemsDiv = styled.div``;
const ItemsList = styled.li``;
