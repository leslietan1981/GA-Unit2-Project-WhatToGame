import React, { useState } from "react";

const useWishlist = () => {
  const [data, setData] = useState([]);

  const api = import.meta.env.VITE_SERVER_AIR;
  const endpoint = "/Wishlist_Table";
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AIR}` };

  const request = async (controller) => {
    try {
      const response = await fetch(api + endpoint, {
        signal: controller.signal,
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Fetch error.");
      }

      const responseData = await response.json();
      setData(() =>
        responseData.records.map((item) => ({ id: item.fields.id, game_json: JSON.parse(item.fields.game_json) })),
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };
  return [data, request];
};

export { useWishlist };
