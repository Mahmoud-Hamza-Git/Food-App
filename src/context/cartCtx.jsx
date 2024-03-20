import { createContext, useState } from "react";

export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  // adding the item to the cart if it is not already there or increasing the count if it is
  const addItem = (item) => {
    setCart((prevCart) => {
      // get the index of the item in the cart - returns -1 if not exists
      const itemIndex = prevCart.findIndex((element) => element.id == item.id);
      // if the item doesn't exists in the cart -> add the new item
      if (itemIndex == -1) {
        const { id, name, price } = item;
        return [...prevCart, { id, name, price, count: 1 }];
      }
      // if it already exists -> increament the count by one
      const newCart = [...prevCart];
      newCart[itemIndex].count++;
      return newCart;
    });
  };

  const resetCart = () => {
    setCart([]);
  };

  const incrementCount = (id) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((element) => element.id == id);
      // increment the count
      const newCart = [...prevCart];
      newCart[itemIndex].count++;
      return newCart;
    });
  };

  const decrementCount = (id) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((element) => element.id == id);
      // decrement the count or remove the item if it's count is 1
      if (prevCart[itemIndex].count > 1) {
        const newCart = [...prevCart];
        newCart[itemIndex].count--;
        return newCart;
      } else {
        const newCart = prevCart.filter((element) => element.id != id);
        return newCart;
      }
    });
  };

  const ctxValue = {
    cart,
    addItem,
    resetCart,
    incrementCount,
    decrementCount,
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
