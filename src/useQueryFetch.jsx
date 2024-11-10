import useAxios from "./useAxios";
import { useQuery, useQueryClient, useMutation } from "react-query";
function useQueryFetch() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    refetch: Refresh,
  } = useQuery("token", DataAxsios, { enabled: false });

  const { getDataByCallback, postDataByCallback, deleteDataByCallback } =
    useAxios();

  function DataAxsios() {
    getDataByCallback("https://api.sampleapis.com/coffee/iced");
  }

  const postMutation = (newTodo) =>
    postDataByCallback("https://api.sampleapis.com/coffee/iced", newTodo);
  const { mutate:newData } = useMutation(postMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("token");
    },
  });

  const handlePost = (inputState,e) => {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title: inputState.title,
      ingredients: inputState.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      description: inputState.description,
      image: inputState.img,
    };

    newData(newTodo);
  };

  const deleteMutation = (id) =>
    deleteDataByCallback(`https://api.sampleapis.com/coffee/iced`, id);
  const { mutate: Data } = useMutation(deleteMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("token");
    },
  });

  const deleteQuery = (id) => {
    Data(id);
    console.log(Data);
  };

  const fethcAgain = () => {
    Refresh();
  };

  return {DataAxsios,handlePost,deleteQuery,fethcAgain,isLoading,isError};
}

export default useQueryFetch;
