// export const backendUrl = "https://food-app-backend-uda3.onrender.com";
export const backendUrl = "http://localhost:3000";
export function formatter(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
