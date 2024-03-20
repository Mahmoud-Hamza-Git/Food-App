import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  userProgress: "",
  showCart: () => {},
  hideCart: () => {},
  showChekout: () => {},
  hideCheckout: () => {},
});

export default function UserProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  const showCart = () => {
    setUserProgress("cart");
  };
  const hideCart = () => {
    setUserProgress("");
  };
  const showCheckout = () => {
    setUserProgress("checkout");
  };
  const hideCheckout = () => {
    setUserProgress("");
  };

  const ctx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return <UserProgressContext.Provider value={ctx}>{children}</UserProgressContext.Provider>;
}
