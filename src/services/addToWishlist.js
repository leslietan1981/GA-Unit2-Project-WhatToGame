import React, { useState } from "react";

const useAddGame = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const api = import.meta.env.VITE_SERVER_AIR;
  const endpoint = "/Wishlist_Table";
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AIR}` };

  const request = async (gameObj) => {
    setIsSuccess(false);

    try {
      const response = await fetch(api + endpoint, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          fields: {
            game_json: JSON.stringify(gameObj),
          },
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        throw new Error("fetch error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { isSuccess, request };
};

export { useAddGame };
