import React from "react";
import { Routes, Route } from "react-router-dom";
import Template from "../containers/Template";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/template" element={<Template />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;