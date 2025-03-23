import { useQuery } from "react-query";
import axios from "axios";

interface DataFromServise {
  goods: Array<{ id: string; name: string; price: number }>;
  totalPages: number;
  currentPage: number;
}

interface usePaginatedData {
  data: DataFromServise | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown | null;
}

function usePaginatedProducts(page: number): usePaginatedData {
  return useQuery(
    ["goods", page],
    async (): Promise<DataFromServise> => {
      const { data } = await axios.get<DataFromServise>(
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
