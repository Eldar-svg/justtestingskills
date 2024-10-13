import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Root from "./Root";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams(); // получаем id из URL
  const [product, setProduct] = useState([]);

  const { title, description, ingredients, image } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://api.sampleapis.com/coffee/iced/${id}`
      );
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]); // перезагружаем данные при изменении id

  return (
    <div className="App">
      <Root />
      <h1>{title}</h1>
      <h1>{description} </h1>
      <img src={`${image}`} alt={`${title}`} width="500" />
      <p>{ingredients}</p>
    </div>
  );
};

export default ProductPage;
