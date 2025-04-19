import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Root from "../../../Root";
import axios from "axios";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
import styles from "./CoffeStyle/editcoffestyle.module.css";
import { TodoItem } from "../../../hooks/useReduceStates";

type ProductInputs = Omit<TodoItem, "id" | "check">;

function EditCoffe(): JSX.Element {
  const { handleQuery } = useQueryFetch();
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<ProductInputs>({
    title: "",
    description: "",
    image: "",
    ingredients: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  // Получение данных продукта
  useEffect(():void => {
    const fetchProduct = async ():Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<ProductInputs>(`http://localhost:5000/goods/${id}`);
        setProduct({
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
          ingredients: data.ingredients || [],
        });
      } catch (err) {
       setError("Failed to fetch product details. Please try again later.") ;
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Обработчик изменений
  const handleChange = (key:string, value:string[]|string) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const navigator = useNavigate();

  // Обработчик сохранения
  const handleSave = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!product.title || !product.description) {
      alert("Title and Description are required fields.");
      return;
    }

    const updatedProduct:TodoItem = {
      ...product,
      id:id!, // включаем id в обновляемые данные
    };

    handleQuery(updatedProduct);
    navigator("/products");
    // передаём обновлённые данные в useQueryFetch
  };

  return (
    <div className={styles.body} >
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
      <h1>Edit Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form>
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
              onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(
                  "ingredients",
                  e.target.value.split(",").map((ing) => ing.trim())
                )
              }
            />
          </div>

          <button className={styles.button} onClick={handleSave} type="submit">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditCoffe;
