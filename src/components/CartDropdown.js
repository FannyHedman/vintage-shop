import React from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const CartDropdown = () => {
    const { cartItems } = useCart()
    const { removeFromCart } = useCart()
    const { clearCart } = useCart()

    const handleRemoveClick = (itemId) => {
        removeFromCart(itemId)
    }

    return (
        <div>
            <h3>Cart</h3>
            <div>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <div>
                                <CartList key={item.id}>
                                    {item.name} - {item.price}
                                </CartList>
                                <button
                                    onClick={() => handleRemoveClick(item.id)}
                                >
                                    Remove from cart
                                </button>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
            <Link to="/checkout">
                <button>Proceed to Checkout</button>
            </Link>
        </div>
    )
}

export default CartDropdown

const CartList = styled.li`
    list-style-type: none;
`
