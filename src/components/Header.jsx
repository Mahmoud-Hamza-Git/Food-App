import React, { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import { CartContext } from "../context/cartCtx";
import { UserProgressContext } from "../context/userProgressCtx";

function Header() {
  const { showCart } = useContext(UserProgressContext);
  const { cart } = useContext(CartContext);

  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="Logo image" />
        <h1>reactfood</h1>
      </div>
      <button className="text-button" onClick={() => showCart()}>
        Cart <span id="cart-count">{cart.length}</span>
      </button>
    </div>
  );
}

export default Header;
