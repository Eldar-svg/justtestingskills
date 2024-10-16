import { useState } from "react";
import axios from "axios";
import { Todocontext } from "./useReduceStates";
import { useContext } from "react";
import { useCallback } from "react";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(Todocontext);

  const setTodo = "setTodo";

  const handleRequest = (callback) => {
    setLoading(true);
    setError(null);
    try {
      callback();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getDataByCallback = useCallback(
    (url) => {
      handleRequest(async () => {
        const response = await axios(url);
        dispatch({ type: setTodo, payload: response.data });
      });
    },
    [dispatch]
  );

  const postDataByCallback = useCallback(
    (url, newData) => {
      handleRequest(async () => {
        const response = await axios.post(url, newData);
        const newTodo = { ...response.data, check: false };
        dispatch({ type: setTodo, payload: [newTodo, ...state.todo] });
      });
    },

    [dispatch, state.todo]
  );

  const deleteDataByCallback = useCallback(
    (url, _id) => {
      handleRequest(async () => {
        await axios.delete(`${url}/${_id}`);
        dispatch({
          type: setTodo,
          payload: state.todo.filter(({ id }) => id !== _id),
        });
      });
    },

    [dispatch, state.todo]
  );

  return {
    loading,
    error,
    getDataByCallback,
    postDataByCallback,
    deleteDataByCallback,
  };
};

export default useAxios;
