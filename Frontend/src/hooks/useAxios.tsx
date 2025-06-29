import axios from "axios";
import { TodoItem } from "./useReduceStates";

import { useDispatch, useSelector } from "react-redux";
import { setTodo, deleteSelectedTodo } from "../redux/TodoSlices";
import { RootState } from "../redux/store";
export interface postDataResult extends TodoItem {
  error?: boolean;
}

export interface useAxiosFunck {
  getData: (url: string) => Promise<TodoItem[]>;
  postData: (url: string, newData: TodoItem, headers: {}) => Promise<void>;
  deleteData: (url: string, id: string) => Promise<void>;
  putData: (url: string, id: string, updatedData: TodoItem) => Promise<void>;
  dataCheck: (url: string, id: string, value: boolean) => Promise<TodoItem>;
  AllSelect: (url: string, check: boolean) => Promise<TodoItem[]>;
}

const useAxios = (): useAxiosFunck => {
  const dispatch = useDispatch();
  const goods = useSelector((state: RootState) => state.newAct.goods);

  const token = localStorage.getItem("token");

  const getData = async (url: string): Promise<TodoItem[]> => {
    try {
      const { data } = await axios.get<TodoItem[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setTodo(goods));
      return data;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error;
    }
  };

  const postData = async (url: string, newData: TodoItem): Promise<void> => {
    try {
      const { data } = await axios.post<postDataResult>(url, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const newTodo: TodoItem = {
        id: data.id,
        title: data.title,
        ingredients: data.ingredients,
        description: data.description,
        image: data.image,
        check: data.check ?? false,
      };
      dispatch(setTodo([newTodo, ...goods]));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const deleteData = async (url: string, id: string): Promise<void> => {
    try {
      await axios.delete<void>(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteSelectedTodo());
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    }
  };

  const putData = async (
    url: string,
    id: string,
    updatedData: TodoItem
  ): Promise<void> => {
    try {
      const { data } = await axios.put<TodoItem>(`${url}${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(
        setTodo(
          goods.map((todo) => (todo.id === id ? { ...todo, ...data } : todo))
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const dataCheck = async (
    url: string,
    id: string,
    check: boolean
  ): Promise<TodoItem> => {
    try {
      if (!url || !id) {
        throw new Error("URL and ID are required");
      }

      const response = await axios.patch<TodoItem>(
        `${url}/${id}`,
        { check },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        throw new Error(
          `Failed to update todo: ${err.response?.data?.error || err.message}`
        );
      } else {
        console.error("Unexpected Error:", err);
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const AllSelect = async (
    url: string,
    check: boolean
  ): Promise<TodoItem[]> => {
    try {
      const { data } = await axios.patch<TodoItem[]>(
        `${url}/check`,
        { check },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        throw new Error(
          `Failed to select all: ${err.response?.data?.error || err.message}`
        );
      }
      console.error("Unexpected Error:", err);
      throw new Error("An unexpected error occurred");
    }
  };

  return {
    getData,
    postData,
    deleteData,
    putData,
    dataCheck,
    AllSelect,
  };
};

export default useAxios;
