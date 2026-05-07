import React, { useState } from "react";

const useWishlist = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [latestAddition, setLatestAddition] = useState({});

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
      const wishlistData = [];
      const genresData = [];
      let latestAddition;
      for (const recordObj of responseData.records) {
        const game_json = JSON.parse(recordObj.fields.game_json);
        const obj = { id: recordObj.id, game_json: game_json, createdTime: recordObj.createdTime };
        wishlistData.push(obj);

        for (const genreObj of game_json.genres) {
          const genreFound = genresData.find((wishlistGenreObj) => wishlistGenreObj.id === genreObj.id);

          if (genreFound) {
            genreFound.count++;
          } else {
            genresData.push({ id: genreObj.id, name: genreObj.name, count: 1 });
          }
        }

        if (latestAddition) {
          const latestAdditionDate = new Date(latestAddition.createdTime);
          const recordDate = new Date(obj.createdTime);
          if (recordDate > latestAdditionDate) latestAddition = obj;
        } else {
          latestAddition = obj;
        }
      }

      setData(wishlistData);
      setGenres(genresData);
      setLatestAddition(latestAddition.game_json);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  };
  return { data, genres, latestAddition, request };
};

export { useWishlist };
