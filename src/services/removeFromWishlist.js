import React, { useState } from "react";

const useRemoveGame = () => {
  const [successCount, setSuccessCount] = useState(0);

  const api = import.meta.env.VITE_SERVER_AIR;
  const endpoint = "/Wishlist_Table";
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AIR}` };

  const request = async (recordId) => {
    try {
      const response = await fetch(api + endpoint + `/${recordId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setSuccessCount((prevState) => prevState + 1);
      } else {
        throw new Error("fetch error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { successCount, request };
};

export { useRemoveGame };
