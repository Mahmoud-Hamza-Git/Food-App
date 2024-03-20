import { useState, useEffect, useCallback } from "react";
import { backendUrl as baseUrl } from "../utils/utilities";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reFetch = useCallback(async function reFetch(url) {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl + url}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setData(data);
    } catch (error) {
      console.error(error);
      setError("Error During Fetching Data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reFetch(url);
  }, []);

  return { data, loading, error, reFetch };
}

export default useFetch;
