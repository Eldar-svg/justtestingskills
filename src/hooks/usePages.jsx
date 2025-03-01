import React, { useContext,useRef } from "react";
import { Todocontext } from "./useReduceStates";

function usePages() {
  const { state } = useContext(Todocontext);
  const [currentPage, setCurrentPage] = React.useState(1);


  const itemsPerPage = 8;
  const totalItems = state.todo.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Индексы элементов для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = state.todo.slice(indexOfFirstItem, indexOfLastItem);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  // Переводим на следующую страницу
  const handleNextPage = (page) => {
    // Проверка, чтобы текущая страница не выходила за пределы
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  // Прокрутка страницы вверх при смене страницы
  const containerRef = useRef(null);
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Инвалидация кеша для обновления данных
 
  return {
    currentItems,
    pages,
    handleNextPage,
    totalPages,
    currentPage,
    containerRef,
  };
}

export default usePages;
