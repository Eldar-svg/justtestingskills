import useAxios from "./useAxios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import React from "react";

function useQueryFetch() {
  const toastId = React.useRef(null);
  const queryClient = useQueryClient();
  const { getDataByCallback, postDataByCallback, deleteDataByCallback } =
    useAxios();

  const {
    isLoading,
    isError,
    refetch: Refresh,
  } = useQuery("token", DataAxsios, {
    enabled: false,
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: "Данные загружены!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: "Ошибка загрузки данных",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    },
  });

  function DataAxsios() {
    return getDataByCallback("https://api.sampleapis.com/coffee/iced");
  }

  const postMutation = (newTodo) =>
    postDataByCallback("https://api.sampleapis.com/coffee/iced", newTodo);

  const { mutate: newData } = useMutation(postMutation, {
    onMutate: () => {
      toastId.current = toast.loading("Добавление...");
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: "Данные успешно добавлены!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
    onError: (error) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          render: `Ошибка: ${error.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    },
  });

  const handlePost = (inputState, e) => {
    e.preventDefault();
    const {title,ingredients,description,img} = inputState
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      description: description,
      image: img,
    };
    newData(newTodo);
  };

  const deleteMutation = (id) =>
    deleteDataByCallback(`https://api.sampleapis.com/coffee/iced`, id);

  const { mutate: Data } = useMutation(deleteMutation, {
    onSuccess: () => {
      toast.success("Успешно удалено!");
      queryClient.invalidateQueries("token");
    },
  });

  const deleteQuery = (id) => {
    Data(id);
  };

  const fethcAgain = () => {
    toastId.current = toast.loading("Загрузка данных...");
    Refresh();
  };

  return {
    DataAxsios,
    handlePost,
    deleteQuery,
    fethcAgain,
    isLoading,
    isError,
  };
}

export default useQueryFetch;
