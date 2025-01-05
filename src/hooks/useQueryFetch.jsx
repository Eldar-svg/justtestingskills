import useAxios from "./useAxios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import { ToastContext } from "./useToast";

function useQueryFetch() {
  const { dispatch, triggerToast, toastActionTypes } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { getData, postData, deleteData } = useAxios();

  const isFetching = useRef(false);

  // Устанавливаем enabled: false для ручного вызова запроса через refetch
  const {
    isLoading,
    isError,
    refetch: Refresh,
  } = useQuery("token", DataAxsios, {
    enabled: false, // Не запускается автоматически

    onSuccess: () => {
      console.log("Data successfully fetched");
      dispatch({ type: toastActionTypes.SUCCESS });
    },
    onError: () => {
      dispatch({ type: toastActionTypes.ERROR });
    },
  });

  // Функция для получения данных
  function DataAxsios() {
    return getData("https://api.sampleapis.com/coffee/iced");
  }

  // Функция для добавления данных
  const { mutate: addData } = useMutation(
    (newTodo) => postData("https://api.sampleapis.com/coffee/iced", newTodo),
    {
      onMutate: () => {
        triggerToast("Adding data...");
      },
      onSuccess: () => {
        dispatch({ type: toastActionTypes.ADDED });
        queryClient.invalidateQueries("token");
      },
      onError: (error) => {
        dispatch({
          type: toastActionTypes.ERROR_ADDED,
          payload: { message: error.message },
        });
      },
    }
  );

  // Функция для удаления данных
  const { mutate: deleteItem } = useMutation(
    (id) => deleteData(`https://api.sampleapis.com/coffee/iced`, id),
    {
      onSuccess: () => {
        toast.success("Deleted successfully!");
        queryClient.invalidateQueries("token");
      },
      onError: (error) => {
        toast.error(`Failed to delete: ${error.message}`);
      },
    }
  );

  // Обработчик для добавления данных
  const handlePost = (inputState, e) => {
    if (e) e.preventDefault();
    const { title, ingredients, description, img } = inputState;
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      description,
      image: img,
    };
    addData(newTodo);
  };

  // Обработчик для удаления данных
  const deleteQuery = (id) => {
    deleteItem(id);
  };

  // Функция для перезагрузки данных
  const fetchAgain = async () => {
    if (isFetching.current) return; // Если запрос уже выполняется, не запускаем повторно
    isFetching.current = true;

    triggerToast("Refreshing data...");
    await Refresh();
    isFetching.current = false;
  };

  return {
    DataAxsios,
    handlePost,
    deleteQuery,
    fetchAgain,
    isLoading,
    isError,
  };
}

export default useQueryFetch;
