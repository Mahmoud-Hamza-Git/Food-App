import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/cartCtx";
import { UserProgressContext } from "../context/userProgressCtx";
import { formatter } from "../utils/utilities";
import CartItem from "./CartItem";

function Cart() {
  const { cart, incrementCount, decrementCount } = useContext(CartContext);
  const { hideCart, progress, showCheckout } = useContext(UserProgressContext);
  let cartTotal = cart.reduce((total, item) => (total = total + item.price * item.count), 0);
  cartTotal = formatter(cartTotal);

  // Handler functions
  const handleCheckout = () => {
    showCheckout();
    console.log("show checkout");
  };

  return (
    <Modal open={progress === "cart"} className="cart" onClose={progress == "cart" ? hideCart : null}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            onIncrease={() => incrementCount(item.id)}
            onDecrease={() => decrementCount(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{cartTotal}</p>
      <p className="modal-actions">
        <button className="text-button" onClick={hideCart}>
          Close
        </button>
        {cart.length > 0 && (
          <button className="button" onClick={handleCheckout}>
            Go to Checkout
          </button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
