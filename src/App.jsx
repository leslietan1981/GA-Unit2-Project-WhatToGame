import React from "react";
import APITestViewer from "./components/APITestViewer";
import LatestListing from "./components/LatestListing";

globalThis.mockRequests = true;

function App() {
  return (
    <div>
      <h2>GA SEB</h2>
      <LatestListing />
    </div>
  );
}

export default App;
