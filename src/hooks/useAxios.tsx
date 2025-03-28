import axios from "axios";
import { Todocontext, TodoItem } from "./useReduceStates";
import { useContext } from "react";

export interface postDataResult extends TodoItem {
  error?: boolean;
}

export interface useAxiosFunck {
  getData: (url: string) => Promise<TodoItem[]>;
  postData: (url: string, newData: TodoItem, headers:{}) => Promise<void>;
  deleteData: (url: string, id: string) => Promise<void>;
  putData: (url: string, id: string, updatedData: TodoItem) => Promise<void>;
}

const useAxios = (): useAxiosFunck => {
  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }
  const { state, dispatch } = context;
  const todoes: TodoItem[] = state.todo; // Исправлен тип

  const token = localStorage.getItem("token");

  const getData = async (url: string): Promise<TodoItem[]> => {
    try {
      const { data } = await axios.get<TodoItem[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "setTodo", payload: data });
      return data
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      throw error
    }
  };

  const postData = async (
    url: string,
    newData: TodoItem
  ): Promise<void> => {
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
        img: data.img,
        check:data.check ?? false
      }; // Убираем check и error
      dispatch({ type: "setTodo", payload: [newTodo, ...todoes] });
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
      dispatch({
        type: "setTodo",
        payload: todoes.filter((todo) => todo.id !== id),
      });
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
      const { data } = await axios.put<TodoItem>(`${url}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: "setTodo",
        payload: todoes.map((todo) =>
          todo.id === id ? { ...todo, ...data } : todo
        ),
      });
     
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
     
    }
  };

  return {
    getData,
    postData,
    deleteData,
    putData,
  };
};

export default useAxios;
