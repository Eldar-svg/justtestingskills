import axios from "axios";
import { Todocontext, TodoItem } from "./useReduceStates";
import { useContext } from "react";

interface postDataResult extends TodoItem {
  error: boolean;
}

interface useAxiosFunck {
  getData: (url: string) => Promise<void>;
  postData: (url: string, newData: TodoItem) => Promise<void>;
  deleteData: (url: string, id: number) => Promise<void>;
  putData: (url: string, id: number, updatedData: TodoItem) => Promise<void>;
}

const useAxios = (): useAxiosFunck => {
  const context = useContext(Todocontext);
  if (!context) {
    throw new Error("useFetchHooks must be used within a TodoProvider");
  }
  const { state, dispatch } = context;
  const todoes: TodoItem[] = state.todo; // Исправлен тип

  const token = localStorage.getItem("token");

  const getData = async (url: string): Promise<void> => {
    try {
      const { data } = await axios.get<TodoItem[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "setTodo", payload: data });
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
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
        image: data.image,
        check:data.check ?? false
      }; // Убираем check и error
      dispatch({ type: "setTodo", payload: [newTodo, ...todoes] });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const deleteData = async (url: string, id: number): Promise<void> => {
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
    id: number,
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
