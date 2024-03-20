import React from "react";
import { formatter } from "../utils/utilities";

export default function CartItem({ name, price, count, onIncrease, onDecrease }) {
  return (
    <li className="cart-item">
      <p className="cart-item-info">
        <span>{name}</span>
        <span>
          {count} x {formatter(price)}
        </span>
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>QTY</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
