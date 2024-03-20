import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./context/cartCtx";
import UserProgressProvider from "./context/userProgressCtx";

function App() {
  return (
    <UserProgressProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
        <a className="button scroll-btn" href="#">
          &uarr;
        </a>
      </CartContextProvider>
    </UserProgressProvider>
  );
}

export default App;
