import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Root from "./Root";
import axios from "axios";
import EachCoffe from "./mainstructure/Products/coffe-list/EachCoffe";
import { DataContext } from "./App"; // Импорт контекста

import { TodoItem } from "./hooks/useReduceStates";
 

const ProductPage = ():JSX.Element => {
  const { id } = useParams<{id:string}>(); // получаем id из URL
  const [product, setProduct] = useState<TodoItem|null>(null);

  // Использование контекста
  const { check,logdata, deleteQuery, toggleCheck } = useContext(DataContext);
  useEffect(() => {
    
    const fetchProduct = async ():Promise<void> => {
      try {
        const response = await axios.get<TodoItem>(`http://localhost:5000/goods/${id}`)
        setProduct(response.data);
        console.log(response.data)
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

  const { title, description, ingredients, img } = product;

  return (
    <div className="App">
      <Root />
 
      <EachCoffe
       id={id}
        title={title}
        description={description}
        ingredients={ingredients}
        image={img}
        logdata={logdata}
        deleteQuery={deleteQuery}
        toggleCheck={toggleCheck}
        check={check}
      />
    </div>
  );
};

export default ProductPage;
