import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
