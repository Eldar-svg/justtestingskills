import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Root from "../../../Root";
import axios from "axios";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
import styles from './CoffeStyle/editcoffestyle.module.css'


function EditCoffe() {
  const { handleQuery } = useQueryFetch();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Получение данных продукта
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://api.sampleapis.com/coffee/iced/${id}`
        );
        setProduct({
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
          ingredients: data.ingredients || [],
        });
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Обработчик изменений
  const handleChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
 
  // Обработчик сохранения
  const handleSave = async (e) => {
    e.preventDefault();
    if (!product.title || !product.description) {
      alert("Title and Description are required fields.");
      return;
    }

    const updatedProduct = {
      ...product,
      id, // включаем id в обновляемые данные
    };
    console.log(1)
   
    handleQuery(updatedProduct); // передаём обновлённые данные в useQueryFetch
  };

  return (
    <div className={styles.body}>
      <Root />
      <ToastContainer
              stacked
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
            />
      <h1   >Edit Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form  >
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={product.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              value={product.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ingredients:</label>
            <textarea
              value={product.ingredients.join(", ")}
              onChange={(e) =>
                handleChange(
                  "ingredients",
                  e.target.value.split(",").map((ing) => ing.trim())
                )
              }
            />
          </div>

          <button className={styles.button} onClick={handleSave}type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditCoffe;
