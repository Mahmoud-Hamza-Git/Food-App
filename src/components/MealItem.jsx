import React, { useContext } from "react";
import { backendUrl as baseUrl } from "../utils/utilities";
import { CartContext } from "../context/cartCtx";

export default function MealItem({ meal }) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="meal-item">
      <article>
        <img src={baseUrl + "/" + meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <div>
          <button className="button meal-item-actions" onClick={() => addItem(meal)}>
            Add to Cart
          </button>
        </div>
      </article>
    </div>
  );
}
