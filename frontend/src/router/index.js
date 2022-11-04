import React from "react";
import { Routes, Route } from "react-router-dom";
import Template from "../containers/Template";
import ProductDetails from "../containers/ProductDetails";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/template" element={<Template />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
