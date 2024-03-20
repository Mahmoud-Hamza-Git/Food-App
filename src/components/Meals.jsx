import MealItem from "./MealItem";
import useFetch from "../hooks/useFetch";

function Meals() {
  const { data: meals, loading, error } = useFetch("/meals");
  console.log("✅", meals);

  return (
    <main id="meals">
      {loading && <p className="loading-msg">Loading Meals...</p>}
      {error && <p className="error-msg">{error}</p>}
      {meals && meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </main>
  );
}

export default Meals;
