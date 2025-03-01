import useAxios from "./useAxios";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import { ToastContext } from "./useToast";

function useQueryFetch() {
  const { dispatch, triggerToast, toastActionTypes } = useContext(ToastContext);
  const queryClient = useQueryClient();
  const { getData, postData, deleteData, putData } = useAxios();
  const token = localStorage.getItem("token");
  const isFetching = useRef(false);

  function DataAxios() {
    return getData("http://localhost:5000/goods");
  }

  const {
    isLoading,
    isError,
    refetch: Refresh,
  } = useQuery("goods", DataAxios, {
    enabled: true,
    onSuccess: () => {
      console.log("Data successfully fetched");
      dispatch({ type: toastActionTypes.SUCCESS });
    },
    onError: () => {
      dispatch({ type: toastActionTypes.ERROR });
    },
  });

  const { mutate: addData } = useMutation(
    (newTodo) =>
      postData("http://localhost:5000/goods", newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    {
      onMutate: async () => {
        await triggerToast("Adding data...");
      },
      onSuccess: () => {
        dispatch({ type: toastActionTypes.ADDED });
        // Обновляем данные в кэше
        queryClient.invalidateQueries("goods");
      },
      onError: (error) => {
        console.error(
          "Error occurred:",
          error.response ? error.response.data : error.message
        );
        dispatch({
          type: toastActionTypes.ERROR_ADDED,
          payload: {
            message: error.response
              ? error.response.data.message
              : error.message,
          },
        });
      },
    }
  );

  const { mutate: deleteItem } = useMutation(
    (id) => deleteData(`http://localhost:5000/goods`, id),
    {
      onSuccess: () => {
        toast.success("Deleted successfully!");
        queryClient.invalidateQueries("goods");
      },
      onError: (error) => {
        toast.error(`Failed to delete: ${error.message}`);
      },
    }
  );

  const { mutate: updateItem } = useMutation(
    (updatedData) =>
      putData(`http://localhost:5000/goods`, updatedData.id, updatedData),
    {
      onMutate: async () => {
        await triggerToast("Updating data...");
      },
      onSuccess: () => {
        dispatch({ type: toastActionTypes.LOADED });
        queryClient.invalidateQueries("goods");
      },
      onError: (error) => {
        console.error("Error toast triggered");
        toast.error(`Failed to update: ${error.message}`);
      },
    }
  );

  const handlePost = (inputState) => {
    const { title, ingredients, description, img } = inputState;
    const newTodo = {
      title,
      ingredients: ingredients
        .split(";")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient !== ""),
      description,
      image: img || null,
    };

    console.log("Отправляемые данные:", newTodo);
    addData(newTodo);
  };

  const deleteQuery = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  const handleQuery = (updatedData) => {
    updateItem(updatedData);
  };

  const fetchAgain = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      triggerToast("Refreshing data...");
      await Refresh();
    } finally {
      isFetching.current = false;
    }
  };

  return {
    DataAxios,
    handlePost,
    deleteQuery,
    fetchAgain,
    isLoading,
    isError,
    handleQuery,
  };
}

export default useQueryFetch;
