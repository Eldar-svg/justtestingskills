import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import { AxiosError } from "axios";
import useAxios from "./useAxios"; // Предполагается, что это кастомный хук
import { ToastContext,ToastContextValue } from "./useToast"; // Контекст для тостов
import { TodoItem } from "./useReduceStates"; // Тип для элемента Todo


interface TodoItemInput {
  id:string;
  title: string;
  ingredients: string;
  description: string;
  img: string;
}

// Интерфейс для возвращаемого значения хука
interface UseQueryResults {
  DataAxios: () => Promise<TodoItem[]>; // Тип возвращаемого значения из getData
  handlePost: (inputState: TodoItemInput) => void;
  deleteQuery: (id: string) => void;
  fetchAgain: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  handleQuery: (updatedData: TodoItem) => void;
}

// Тип для контекста ToastContext (предполагаемый)
 
function useQueryFetch(): UseQueryResults {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }
  const { dispatch, triggerToast } = context as ToastContextValue;

  const queryClient = useQueryClient();
  const { getData, postData, deleteData, putData } = useAxios(); // Предполагаем, что useAxios типизирован
  const token = localStorage.getItem("token"); // string | null
  const isFetching = useRef(false);

  // Функция для получения данных
  function DataAxios(): Promise<TodoItem[]> {
    return getData("http://localhost:5000/goods");
  }

  const {
    isLoading,
    isError,
    refetch: Refresh,
  } = useQuery<TodoItem[], AxiosError>("goods", DataAxios, {
    staleTime: 5 * 60 * 1000,
    enabled: true,
    refetchOnWindowFocus: false,
    onSuccess: (): void => {
      console.log("Data successfully fetched");
      dispatch({ type: "SUCCESS" });
    },
    onError: (): void => {
      dispatch({ type: "ERROR" });
    },
  });

  const { mutate: addData } = useMutation(
    (newTodo: TodoItem): Promise<void> =>
      postData("http://localhost:5000/goods", newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
    {
      onMutate: async (): Promise<void> => {
        await triggerToast("Adding data...");
      },
      onSuccess: (): void => {
        dispatch({ type: "ADDED" });
        queryClient.invalidateQueries("goods");
      },
      onError: (error: AxiosError<{ message?: string }>): void => {
        const errorMessage =
          error.response?.data?.message || error.message;
        console.error("Error occurred:", errorMessage);
        dispatch({
          type: "ERROR_ADDED",
          payload: { message: errorMessage },
        });
      },
    }
  );

  const { mutate: deleteItem } = useMutation(
    (id: string): Promise<void> => deleteData(`http://localhost:5000/goods`, id),
    {
      onSuccess: (): void => {
        toast.success("Deleted successfully!");
        queryClient.invalidateQueries("goods");
      },
      onError: (error: Error): void => {
        toast.error(`Failed to delete: ${error.message}`);
      },
    }
  );

  const { mutate: updateItem } = useMutation(
    (updatedData: TodoItem): Promise<void> =>
      putData(`http://localhost:5000/goods`, updatedData.id, updatedData),
    {
      onMutate: async (): Promise<void> => {
        await triggerToast("Updating data...");
      },
      onSuccess: (): void => {
        dispatch({ type: "LOADED" });
        queryClient.invalidateQueries("goods");
      },
      onError: (error: Error): void => {
        console.error("Error toast triggered");
        toast.error(`Failed to update: ${error.message}`);
      },
    }
  );

  const handlePost = (inputState: TodoItemInput): void => {
    const { id, title, ingredients, description, img } = inputState;
    const newTodo: TodoItem = {
      id,
      title,
      ingredients: ingredients
        .split(";")
        .map((ingredient:string) => ingredient.trim())
        .filter((ingredient:string) => ingredient !== ""),
      description,
      img: img ,
    };

    console.log("Отправляемые данные:", newTodo);
    addData(newTodo);
  };

  const deleteQuery = (id: string): void => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
    }
  };

  const handleQuery = (updatedData: TodoItem): void => {
    updateItem(updatedData);
  };

  const fetchAgain = async (): Promise<void> => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      await triggerToast("Refreshing data...");
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