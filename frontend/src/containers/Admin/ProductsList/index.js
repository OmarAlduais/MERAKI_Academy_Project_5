import React, { useEffect, useState } from "react";
import "./productslist.style.css";

import axios from "axios";
import EditProductDialog from "../../../components/EditProductDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  deleteFromProducts,
} from "../../../redux/reducers/products";
import { gettAllProducts } from "../../../redux/selectors/products.selectors";
import { getToken } from "../../../redux/selectors/auth.selectors";

const ProductsList = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [productDetails, setProductDetails] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector(gettAllProducts);
  const token = useSelector(getToken);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        dispatch(setProducts(res.data.result));
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  const showEdit = (product) => {
    setIsEdit(true);
    setProductDetails(product);
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deleteFromProducts(id));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <table>
        <caption>Products List</caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            products.map((product) => (
              <tr key={product.id}>
                <td data-label="Title">{product.title}</td>
                <td data-label="Price">${product.price}</td>
                <td data-label="Actions">
                  <div className="actions-btns">
                    <div className="edit-btn" onClick={() => showEdit(product)}>
                      green{" "}
                    </div>
                    <div
                      className="edit-btn"
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    >
                      red{" "}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isEdit && (
        <EditProductDialog
          productDetails={productDetails}
          setIsEdit={setIsEdit}
          products={products}
          setProducts={setProducts}
        />
      )}
      {message && <div>{message}</div>}
    </>
  );
};

export default ProductsList;