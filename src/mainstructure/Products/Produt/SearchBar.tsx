import React from "react";
import { ListofToggleHook } from "./ListofToggleHook";
import { motion } from "framer-motion";
type InputValues = string | number;
interface SearchProps {
  inputState: ListofToggleHook;
  handlerinput: (field: string, value: InputValues) => void;
  inputToggle: (key: keyof ListofToggleHook) => void;
  
}
function SearchBar({
  inputToggle,
  handlerinput,
  inputState,
 
}: SearchProps): JSX.Element {
  const { openSearch, search } = inputState;
  return (
    <div>
      <motion.button whileTap={{ scale: 0.9 }} className="mainbtn" onClick={(): void => inputToggle("openSearch")}>
        {openSearch ? "close" : "Search bar"}
      </motion.button>
      {openSearch ? (
        <input 
        className=" ml-1 p-2 "
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handlerinput("search", e.target.value)
          }
          type="text"
          placeholder="enter the searchable text"
        />
      ) : null}
    </div>
  );
}

export default SearchBar;
