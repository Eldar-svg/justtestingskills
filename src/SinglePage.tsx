import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Root from "./Root";
import EachCoffe from "./mainstructure/Products/coffe-list/EachCoffe";
import { DataContext } from "./App";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TodoItem } from "./hooks/useReduceStates";
import useQueryFetch from "./hooks/useQueryFetch";

const ProductPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { logdata } = useContext(DataContext);

  const { deleteQuery, CheckToggle } = useQueryFetch();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<TodoItem, Error>({
    queryKey: ["goods", id],
    queryFn: async () => {
      const { data } = await axios.get<TodoItem>(
        `http://localhost:5000/goods/${id}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const { title, description, ingredients, image, check } = product;

  return (
    <div>
      <Root />
      <EachCoffe
        id={id!}
        title={title}
        description={description}
        ingredients={ingredients}
        image={image}
        logdata={logdata}
        deleteQuery={deleteQuery}
        check={check} // Передаём текущее состояние чекбокса
        CheckToggle={CheckToggle} // Передаём функцию для переключения
      />
    </div>
  );
};

export default ProductPage;
