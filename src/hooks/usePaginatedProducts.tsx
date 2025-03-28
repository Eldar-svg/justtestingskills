import { useQuery,UseQueryResult } from "react-query";
import axios from "axios";
import { TodoItem } from "./useReduceStates";

export interface DataFromServise {
  goods: TodoItem[]
  totalPages: number;
  currentPage: number;
}

export interface usePaginatedData {
  data: DataFromServise | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown | null;
}

function usePaginatedProducts(page: number): UseQueryResult<DataFromServise, Error> {
  return useQuery(
    ["goods", page],
    async (): Promise<usePaginatedData> => {
      const { data } = await axios.get<usePaginatedData>(
        `http://localhost:5000/goods?page=${page}&limit=1`
      );

      return data; // Здесь возвращаем все данные, включая goods, totalPages и currentPage
    },

    {
      keepPreviousData: true, // Для сохранения данных предыдущей страницы
    }
  );
}

export default usePaginatedProducts;
