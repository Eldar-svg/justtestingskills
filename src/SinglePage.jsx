import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Root from "./Root";
import axios from "axios";
import EachCoffe from "./mainstructure/Products/coffe-list/EachCoffe";
import { DataContext } from "./App"; // Импорт контекста
const ProductPage = () => {
  const { id } = useParams(); // получаем id из URL
  const [product, setProduct] = useState(null);

  // Использование контекста
  const { check,logdata, deleteQuery, toggleCheck } = useContext(DataContext);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://api.sampleapis.com/coffee/iced/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  // Проверяем, что product существует перед деструктуризацией
  if (!product) {
    return <div>Loading...</div>; // Показываем сообщение загрузки, пока данные не получены
  }

  const { title, description, ingredients, image } = product;

  return (
    <div className="App">
      <Root />
      <h1>{title}</h1>
      <h2>{description}</h2>
      <img src={image} alt={title} width="500" />
      <p>{ingredients}</p>
      <EachCoffe
       id={id}
        title={title}
        description={description}
        ingredients={ingredients}
        image={image}
        logdata={logdata}
        deleteQuery={deleteQuery}
        toggleCheck={toggleCheck}
        check={check}
      />
    </div>
  );
};

export default ProductPage;
