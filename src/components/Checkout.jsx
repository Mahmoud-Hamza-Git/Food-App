import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../context/cartCtx";
import { UserProgressContext } from "../context/userProgressCtx";
import { backendUrl, formatter } from "../utils/utilities";
import Input from "./UI/Input";
import { useState } from "react";

export default function Checkout() {
  const { cart, resetCart } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);
  const [successModal, setSuccessModal] = useState(false);

  let cartTotal = cart.reduce((total, item) => (total = total + item.price * item.count), 0);
  cartTotal = formatter(cartTotal);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customer = Object.fromEntries(fd.entries());
    const orderData = {
      customer,
      items: cart,
    };

    async function submitOrder() {
      try {
        const res = await fetch(`${backendUrl}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: orderData }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        hideCheckout();
        resetCart();
        setSuccessModal(true);
        console.log("Order Submitted successfully🎉", data);
      } catch (error) {
        console.error("Error submitting order❌", error);
      }
    }

    submitOrder();
  }

  if (successModal) {
    return (
      <Modal
        open={successModal}
        onClose={() => setSuccessModal(false)}
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2>Order Submitted</h2>
        <p>Your order has been submitted successfully. Thank you for shopping with us!</p>
        <p className="modal-actions">
          <button className="button" onClick={() => setSuccessModal(false)}>
            Close
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="checkout"
      open={progress == "checkout"}
      onClose={progress == "checkout" ? hideCheckout : null}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />

        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        <p className="modal-actions">
          <button className="text-button" type="button" onClick={hideCheckout}>
            Close
          </button>
          <button className="button">Submit Order</button>
        </p>
      </form>
    </Modal>
  );
}
