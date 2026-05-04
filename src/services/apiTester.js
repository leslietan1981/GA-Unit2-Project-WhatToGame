import { useState } from "react";

const useAPITest = () => {
  const [data, setData] = useState([]);

  const request = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/games${import.meta.env.VITE_API_KEY}`);
      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      setData(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return { data, request };
};

export { useAPITest };
