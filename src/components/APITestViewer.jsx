import React, { useEffect } from "react";
import { useAPITest } from "../services/apiTester";

const APITestViewer = () => {
  const apiTester = useAPITest();

  useEffect(() => {
    apiTester.request();
  }, []);

  return <div>{apiTester.data && JSON.stringify(apiTester.data)}</div>;
};

export default APITestViewer;
