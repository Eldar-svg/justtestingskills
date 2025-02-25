import axios from "axios";
import { Todocontext } from "./useReduceStates";
import { useContext } from "react";

const useAxios = () => {
  const { state, dispatch } = useContext(Todocontext);
  const todoes = state.todo;
  const setTodo = "setTodo";

  const token = localStorage.getItem("token"); // Получаем токен из localStorage

  // Функция для отправки GET-запроса с токеном в заголовке
  const getData = async (url) => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке
        },
      });
      dispatch({ type: setTodo, payload: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Функция для отправки POST-запроса с токеном в заголовке
  const postData = async (url, newData) => {
    try {
      const { data } = await axios.post(url, newData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке
          'Content-Type': 'application/json', // Указываем тип контента
        },
      });
      const newTodo = { ...data, check: false };
      dispatch({ type: setTodo, payload: [newTodo, ...todoes] });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  // Функция для отправки DELETE-запроса с токеном в заголовке
  const deleteData = async (url, _id) => {
    try {
      await axios.delete(`${url}/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке
        },
      });
      dispatch({
        type: setTodo,
        payload: todoes.filter(({ id }) => id !== _id),
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Функция для отправки PUT-запроса с токеном в заголовке
  const putData = async (url, _id, updatedData) => {
    try {
      const { data } = await axios.put(`${url}/${_id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке
          'Content-Type': 'application/json', // Указываем тип контента
        },
      });
      dispatch({
        type: setTodo,
        payload: todoes.map((todo) => (todo.id === _id ? { ...todo, ...data } : todo)),
      });
    } catch (error) {
      console.error('Error updating data:', error);
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
