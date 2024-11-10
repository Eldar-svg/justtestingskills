
import React, { useContext } from "react";
import { Todocontext } from "./useReduceStates";
import { useRef } from "react";
function usePages() {

    const { state } = useContext(Todocontext);
    const [currentPage, setCurrentPage] = React.useState(1);

    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = state.todo.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(state.todo.length / itemsPerPage);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handleNextPage = (page) => {
      setCurrentPage(page);
      scrollToTop()
    };
    const containerRef = useRef(null)
    const scrollToTop = () => {
      if (containerRef.current) {
          containerRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };
  

    
  return {currentItems,pages,handleNextPage,totalPages,currentPage,containerRef}
}

export default usePages