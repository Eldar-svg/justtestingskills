import axios from "axios";
import { Todocontext } from "./useReduceStates";
import { useContext } from "react";

const useAxios = () => {
  const { state, dispatch } = useContext(Todocontext);
  const todoes = state.todo;
  const setTodo = "setTodo";

  const getData = async (url) => {
    const { data } = await axios(url);
    dispatch({ type: setTodo, payload: data });
  };

  const postData = async (url, newData) => {
    const { data } = await axios.post(url, newData);
    const newTodo = { ...data, check: false };
    dispatch({ type: setTodo, payload: [newTodo, ...todoes] });
  };

  const deleteData = async (url, _id) => {
    await axios.delete(`${url}/${_id}`);
    dispatch({
      type: setTodo,
      payload: todoes.filter(({ id }) => id !== _id),
    });
  };

  const putData = async (url, _id, updatedData) => {
    const { data } = await axios.put(`${url}/${_id}`, updatedData);
    dispatch({
      type: setTodo,
      payload: todoes.map((todo) => (todo.id === _id ? { ...todo, ...data } : todo)),
    });
  };
  

  return {
    getData,
    postData,
    deleteData,
    putData
  };
};

export default useAxios;
