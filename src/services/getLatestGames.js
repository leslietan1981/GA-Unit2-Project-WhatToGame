import { useState } from "react";
import { devLatestGames } from "./devLatestGames";

const useLatestGames = () => {
  const [data, setData] = useState([]);

  if (globalThis.mockRequests) {
    return [data, () => setData(devLatestGames)];
  }

  const api = import.meta.env.VITE_SERVER;
  const endpoint = "/games";
  const keyParam = import.meta.env.VITE_API_KEY;
  const dateParam = getDateParameter();
  const orderParam = "&ordering=-released";
  const pageSizeParam = "&page_size=20";
  const parentPlatformParam = "&parent_platforms=1,2,3,4,5,7,8";

  function getDateParameter() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return `&dates=${new Date(year, month - 2, 1).toLocaleDateString("en-CA")},${new Date(year, month + 1, 0).toLocaleDateString("en-CA")}`;
  }

  const request = async (controller, filters = "") => {
    const parameters = [dateParam, orderParam, pageSizeParam, filters || parentPlatformParam].join("");
    try {
      const res = await fetch(api + endpoint + keyParam + parameters, { signal: controller.signal });
      if (!res.ok) {
        throw new Error("Fetch error.");
      }

      const resData = await res.json();
      setData(resData);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };
  return [data, request];
};

export { useLatestGames };
