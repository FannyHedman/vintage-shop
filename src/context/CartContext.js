// // import { createContext, useContext, useEffect, useState } from 'react'

// // const CartContext = createContext()

// // export const useCart = () => {
// //     return useContext(CartContext)
// // }

// // export const CartProvider = ({ children }) => {
// //     const [cartItems, setCartItems] = useState([])

// //     useEffect(() => {
// //         const storedCart = JSON.parse(localStorage.getItem('cart'))
// //         if (storedCart) {
// //             setCartItems(storedCart)
// //         }
// //     }, [])

// //     const addToCart = (item) => {
// //         setCartItems((prevCartItems) => {
// //             const updatedCart = [...prevCartItems, item]
// //             localStorage.setItem('cart', JSON.stringify(updatedCart))
// //             return updatedCart
// //         })
// //     }

// //     const removeFromCart = (itemId) => {
// //         setCartItems((prevCartItems) => {
// //             const updatedCart = prevCartItems.filter(
// //                 (item) => item.id !== itemId
// //             )
// //             localStorage.setItem('cart', JSON.stringify(updatedCart))
// //             return updatedCart
// //         })
// //     }

// //     const clearCart = () => {
// //         setCartItems([])
// //         localStorage.removeItem('cart')
// //     }

// //     return (
// //         <CartContext.Provider
// //             value={{
// //                 cartItems,
// //                 addToCart,
// //                 removeFromCart,
// //                 clearCart
// //             }}
// //         >
// //             {children}
// //         </CartContext.Provider>
// //     )
// // }

// import { createContext, useContext, useEffect, useState } from 'react';

// const CartContext = createContext();

// export const useCart = () => {
//   return useContext(CartContext);
// };

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart'));
//     if (storedCart) {
//       setCartItems(storedCart);
//     }
//   }, []);

//   const addToCart = (item) => {
//     setCartItems((prevCartItems) => {
//       const updatedCart = [...prevCartItems, item];
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prevCartItems) => {
//       const updatedCart = prevCartItems.filter(
//         (item) => item.id !== itemId
//       );
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('cart');
//   };

//   const updateCartItemQuantity = (itemId, quantity) => {
//     setCartItems((prevCartItems) => {
//       const updatedCart = prevCartItems.map((item) =>
//         item.id === itemId
//           ? { ...item, quantity: (item.quantity || 1) + quantity }
//           : item
//       );
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//       return updatedCart;
//     });
//   };


//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateCartItemQuantity,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// CartProvider.js

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems, { ...item, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter(
        (item) => item.id !== itemId
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const updateCartItemQuantity = (itemId, change) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: (item.quantity || 1) + change }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const increaseCartItemQuantity = (itemId) => {
    updateCartItemQuantity(itemId, 1);
  };

  const decreaseCartItemQuantity = (itemId) => {
    updateCartItemQuantity(itemId, -1);
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
