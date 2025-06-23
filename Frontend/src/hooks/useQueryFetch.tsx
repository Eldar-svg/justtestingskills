import { useQuery, useQueryClient, useMutation } from "react-query";
import { toast } from "react-toastify";
import { useContext, useRef } from "react";
import axios, { AxiosError } from "axios";
import useAxios from "./useAxios"; // Предполагается, что это кастомный хук
// import { ToastContext, ToastContextValue } from "./useToast"; // Контекст для тостов
import { TodoItem } from "./useReduceStates"; // Тип для элемента Todo
import { ListofToggleHook } from "../mainstructure/Products/Produt/ListofToggleHook";
import { useDispatch } from "react-redux";
import {
  setToastId,
  success,
  error,
  secondError,
  added,
  loaded,
} from "../redux/ToastSlice";
 
export interface UseQueryResults {
  DataAxios: () => Promise<TodoItem[]>;
  handlePost: (inputState: ListofToggleHook) => void;
  deleteQuery: ((id: string) => void) | null;
  fetchAgain: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  handleQuery: (updatedData: TodoItem) => void;
  CheckToggle: (id: string, value: boolean) => void;
  BtnDelete: () => void;
  handleAll: (value: boolean) => void;
}

function useQueryFetch(): UseQueryResults {
  const dispath = useDispatch();

  const trigger = (message:string) => {
    const toastId = crypto.randomUUID()
    dispath(setToastId({ id: toastId, message}));
  };

  const queryClient = useQueryClient();
  const { getData, postData, deleteData, putData, dataCheck, AllSelect } =
    useAxios();
  const token = localStorage.getItem("token");
  const isFetching = useRef(false);

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
      dispath(success());
    },
    onError: (): void => {
      dispath(error());
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
trigger('Adding')

      },
      onSuccess: (): void => {
        dispath(added());
        queryClient.invalidateQueries("goods");
      },
      onError: (error: AxiosError<{ message?: string }>): void => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error occurred:", errorMessage);
        dispath(secondError({ message: errorMessage }));
 
    }
});

  const { mutate: deleteItem } = useMutation(
    (id: string): Promise<void> =>
      deleteData(`http://localhost:5000/goods`, id),
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
      putData(`http://localhost:5000/goods/`, updatedData.id, updatedData),
    {
      onMutate: async (): Promise<void> => {
        trigger('Uptaaaded')
      },
      onSuccess: (): void => {
        dispath(loaded());
        queryClient.invalidateQueries("goods");
      },
      onError: (error: Error): void => {
        console.error("Error toast triggered");
        toast.error(`Failed to update: ${error.message}`);
      },
    }
  );
  const { mutate: newCheck } = useMutation(
    ({ id, value }: { id: string; value: boolean }): Promise<TodoItem> =>
      dataCheck(`http://localhost:5000/goods`, id, value),
    {
      onSuccess: (value: TodoItem): void => {
        queryClient.invalidateQueries(["goods"]);
        if (value.check) {
          toast.success("updated!");
        } else {
          toast.success("untoggle");
        }
      },
      onError: (error: Error): void => {
        console.error("Error in newCheck:", error);
        toast.error(`Failed to update: ${error.message}`);
      },
    }
  );

  const { mutate: GetAllSelect } = useMutation(
    ({ value }: { value: boolean }): Promise<TodoItem[]> =>
      AllSelect("http://localhost:5000/all", value),
    {
      onSuccess: (): void => {
        queryClient.invalidateQueries(["goods"]);
        toast.success("All items selected!");
      },
      onError: (error: AxiosError<{ message?: string }>): void => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error in selectAll:", errorMessage);
        toast.error(` ${errorMessage}`);
      },
    }
  );
  const handleAll = (value: boolean): void => {
    GetAllSelect({ value });
  };

  const { mutate: DeleteAllPosts } = useMutation(
    async () => {
      const { data } = await axios.delete("http://localhost:5000/delete");
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["goods"]);
        toast.success("Все товары удалены");
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Ошибка при удалении всех товаров:", errorMessage);
        toast.error(errorMessage);
      },
    }
  );

  const handlePost = (inputState: ListofToggleHook): void => {
    const { id, title, ingredients, description, image } = inputState;
    const newTodo: TodoItem = {
      id,
      title,
      ingredients: ingredients
        .split(";")
        .map((ingredient: string) => ingredient.trim())
        .filter((ingredient: string) => ingredient !== ""),
      description,
      image:
        image ||
        "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg",
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
      trigger('refreshhh')
      await Refresh();
    } finally {
      isFetching.current = false;
    }
  };
  const BtnDelete = () => {
    DeleteAllPosts();
  };
  const CheckToggle = (id: string, value: boolean): void => {
    newCheck({ id, value });
    console.log(id, value);
  };

  return {
    DataAxios,
    handlePost,
    deleteQuery,
    fetchAgain,
    isLoading,
    isError,
    handleQuery,
    CheckToggle,
    handleAll,
    BtnDelete,
  };
}

export default useQueryFetch;
