import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Root from "../Routing/Root";
import axios from "axios";
import useQueryFetch from "../../../hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
 
import { TodoItem } from "../../../hooks/useReduceStates";

type ProductInputs = Omit<TodoItem, "id" | "check">;

function EditCoffe(): JSX.Element {
  const { handleQuery } = useQueryFetch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInputs>({
    title: "",
    description: "",
    image: "",
    ingredients: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Получение данных продукта
  useEffect((): void => {
    const fetchProduct = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<ProductInputs>(
          `http://localhost:5000/goods/${id}`
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
  const handleChange = (key: string, value: string[] | string) => {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const navigator = useNavigate();

  // Обработчик сохранения
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!product.title || !product.description) {
      alert("Title and Description are required fields.");
      return;
    }

    const updatedProduct: TodoItem = {
      ...product,
      id: id!, // включаем id в обновляемые данные
    };

    handleQuery(updatedProduct);
    navigator("/products");
    // передаём обновлённые данные в useQueryFetch
  };

  return (
    <div>
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
      <h1 className="text-3xl text-amber-100 text-center bg-amber-600 max-w-[240px] uppercase mx-auto mb-5 rounded-2xl p-3">
        Edit Page
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form className="flex flex-col bg-amber-50 rounded-2xl max-w-[500px]  mx-auto gap-5 p-5">
          <div className="flex flex-col space-y-3 text-center text-xl ">
            <label>Title:</label>
            <input
            className="inputbtn"
              type="text"
              value={product.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            
   


            <label>Description:</label>
            <textarea
            className="inputbtn"
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <label>Image URL:</label>
            <input
            className="inputbtn"
              type="text"
              value={product.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />

            <label>Ingredients:</label>
            <textarea
            className="inputbtn"
              value={product.ingredients.join(", ")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(
                  "ingredients",
                  e.target.value.split(",").map((ing) => ing.trim())
                )
              }
            />
          </div>

          <button className="mainbtn" onClick={handleSave} type="submit">
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}

export default EditCoffe;
