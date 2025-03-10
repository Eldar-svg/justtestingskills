import { useQuery } from "react-query";
import axios from "axios";

function usePaginatedProducts(page) {
  
  return useQuery(
    ["goods", page],
    async () => {
      const { data } = await axios.get(
        `http://localhost:5000/goods?page=${page}&limit=1`
      ); 
       
      console.log(data)
      return data; // Здесь возвращаем все данные, включая goods, totalPages и currentPage
    },
    
    {
      keepPreviousData: true, // Для сохранения данных предыдущей страницы
    }
    
  )
  
}

export default usePaginatedProducts;