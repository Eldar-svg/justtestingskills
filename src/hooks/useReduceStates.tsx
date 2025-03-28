import { createContext, ReactNode, useReducer } from "react";

export interface TodoItem {
  id: string;
  title: string;
  ingredients: string[];
  description: string;
  img: string;
  check?: boolean;
}

export interface TodoState {
  todo: TodoItem[];
  allSelected: boolean;
}

interface ContextTodo {
  children: ReactNode
}

export type TodoAction =
  | { type: "Toggle"; payload: { id: TodoItem["id"]; value: boolean } }
  | { type: "setTodo"; payload: TodoItem[] }
  | { type: "selectAllBtn" }
  | { type: "DeleteSelected" };

export const Todocontext = createContext<{state:TodoState, dispatch:React.Dispatch<TodoAction>}| undefined> (undefined)

function reducer(state: TodoState, action:TodoAction): TodoState {
  switch (action.type) {
    case "Toggle":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.payload.id
            ? { ...item, check: action.payload.value }
            : item
        ),
      };

    case "setTodo":
      return { ...state, todo: action.payload };
    case "selectAllBtn":
      return {
        ...state,
        todo: state.todo.map((item) => ({
          ...item,
          check: !state.allSelected,
        })),
        allSelected: !state.allSelected,
      };
    case "DeleteSelected":
      return { ...state, todo: state.todo.filter((item) => !item.check) };
    default:
      return state;
  }
}

export default function useReduceStates({ children }:ContextTodo):JSX.Element {
  const initialState = { todo: [], allSelected: false };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Todocontext.Provider value={{ state, dispatch }}>
      {children}
    </Todocontext.Provider>
  );
}
