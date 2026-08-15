import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
