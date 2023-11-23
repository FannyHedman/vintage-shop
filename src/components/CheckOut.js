import React, { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../context/CartContext'
import StyledButton from './StyledButton'

const CheckOut = () => {
    const { cartItems, clearCart, removeFromCart } = useCart()
    const [formData, setFormData] = useState({})
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setShowConfirmation(true)
        clearCart()
    }

    const handleRemoveClick = (itemId) => {
        removeFromCart(itemId)
    }

    const emptyCart = (event) => {
        event.stopPropagation()
        clearCart()
    }

    const itemCounts = cartItems.reduce((map, item) => {
        const { id } = item
        map[id] = (map[id] || 0) + 1
        return map
    }, {})

    const uniqueItems = [...new Set(cartItems.map((item) => item.id))]

    const totalSum = cartItems.reduce((sum, item) => {
        return sum + Number(item.price)
    }, 0)


  const isPurchaseDisabled = cartItems.length === 0;


    return (
        <Container>
            <CartCard>
                <h3
                    style={{
                        marginBottom: '40px',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'normal'
                    }}
                >
                    Cart
                </h3>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div>
                        <ul>
                            {uniqueItems.map((itemId) => (
                                <div key={itemId}>
                                    <ItemsList>
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
                                        ({itemCounts[itemId]})
                                    </ItemsList>
                                    <div
                                        style={{
                                            marginTop: '5px',
                                            marginBottom: '15px'
                                        }}
                                    >
                                        <Button
                                            onClick={() =>
                                                handleRemoveClick(itemId)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <ClearCartButton
                            style={{ backgroundColor: 'lightgrey' }}
                            onClick={(event) => emptyCart(event)}
                        >
                            Clear cart
                        </ClearCartButton>
                        <TotalSum>Total: {totalSum.toFixed(2)}</TotalSum>
                    </div>
                )}
            </CartCard>

            <FormCard showConfirmation={showConfirmation}>
        {showConfirmation ? (
          <div>
            <h2>Thank you for your purchase!</h2>
            <h4>Confirmation details</h4>
            <div>
              <strong>Name:</strong> {formData.name}
            </div>
            <div>
              <strong>Email:</strong> {formData.email}
            </div>
            <div>
              <strong>Address:</strong> {formData.address}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </FormGroup>
            <FormGroup>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </FormGroup>
            <FormGroup>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  required
                />
              </label>
            </FormGroup>
            <ButtonGroup>
            {isPurchaseDisabled ? (
    <p style={{border: 'solid 1px red', padding: '5px'}}>Nothing to purchase</p>
  ) : (
    <StyledButton type="submit">Purchase</StyledButton>
  )}
            </ButtonGroup>
          </form>
        )}
      </FormCard>
        </Container>
    )
}

export default CheckOut

const Container = styled.div`
    display: flex;
    justify-content: space-around;
`

const Card = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    box-sizing: border-box;
`

const CartCard = styled(Card)`
    width: 25%;
    border: none;
    padding-top: 0;
`

const FormCard = styled(Card)`
    width: 45%;
    height: 300px;
    margin-top: 50px;
    border: ${(props) => (props.showConfirmation ? 'none' : '1px solid #ccc')};
`

const ItemsList = styled.li`
    list-style-type: none;
`
const Button = styled.button`
    background-color: darkgray;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`

const ClearCartButton = styled.button`
  background-color: darkgray;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  margin-left: 40px;
  margin-top: 30px;
`;

const FormGroup = styled.div`
    margin-bottom: 16px;

    label {
        display: block;
        margin-bottom: 8px;
    }

    input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
`

const ButtonGroup = styled.div`
    button {
        background-color: #4caf50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`
const TotalSum = styled.p`
    font-size: 22px;
    color: black;
    text-align: center;
`
