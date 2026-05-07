import { useState } from "react";
import { devLatestGames } from "./dev_datasets/devLatestGames";
import { getIncludedParentPlatformParameter } from "../utils/platformTagUtil";

const useLatestGames = () => {
  const [data, setData] = useState([]);

  if (globalThis.mockRequests) {
    return [data, () => setData(devLatestGames)];
  }

  const api = import.meta.env.VITE_SERVER_RAWG;
  const endpoint = "/games";
  const keyParam = import.meta.env.VITE_API_KEY_RAWG;
  const dateParam = getDateParameter();
  const orderParam = "&ordering=-released";
  const pageSizeParam = "&page_size=20";

  function getDateParameter() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    return `&dates=${new Date(year, month - 2, 1).toLocaleDateString("en-CA")},${new Date(year, month + 1, 0).toLocaleDateString("en-CA")}`;
  }

  const request = async (controller, filters = "") => {
    const parameters = [dateParam, orderParam, pageSizeParam, filters || getIncludedParentPlatformParameter()].join("");
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
  return { data, request };
};

export { useLatestGames };
