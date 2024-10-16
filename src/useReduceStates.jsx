 
import { createContext, useReducer } from "react";


export const Todocontext = createContext()

function reducer(state, action) {
 
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

export default function useReduceStates({children}) {
    const initialState = { todo: [], allSelected: false }; 
    const [state, dispatch] = useReducer(reducer, initialState)
    
return <Todocontext.Provider value={{state, dispatch}}>
    {children}
</Todocontext.Provider>
}

