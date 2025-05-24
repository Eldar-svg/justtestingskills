import { useQuery,UseQueryResult } from "react-query";
import axios from "axios";
import { TodoItem } from "./useReduceStates";

export interface DataFromServise {
  goods: TodoItem[]
  totalPages: number;
  currentPage: number;
}

 
function usePaginatedProducts(type: "goods"|"ingrid", page?: number ): UseQueryResult<DataFromServise, Error> {
  return useQuery(
    [type, page],
    async (): Promise<DataFromServise> => {
      const { data } = await axios.get<DataFromServise>(
        `http://localhost:5000/${type}?page=${page}&limit=2`
      );

      return data; // Здесь возвращаем все данные, включая goods, totalPages и currentPage
    },

    {
      keepPreviousData: true, // Для сохранения данных предыдущей страницы
    }
  );
}

export default usePaginatedProducts;
