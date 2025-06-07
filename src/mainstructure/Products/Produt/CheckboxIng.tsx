import React from "react";
import usePaginatedProducts from "../../../hooks/usePaginatedProducts";
import { useState } from "react";
interface CheckBoxResult {
  CheckToggle: (id: string, value: boolean) => void;
  handlerScrollUp: (pageNum: number) => void;
  page: number;
}

interface Product {
  id: string;
  ingredients: string | string[];
  check?: boolean;
}

function CheckboxIng({ CheckToggle }: CheckBoxResult): JSX.Element {
  const [pageIng, setPageIng] = useState<number>(1);
  const { data, isLoading, error } = usePaginatedProducts("goods", pageIng);

  const handlerPageIng = (
    e: React.MouseEvent<HTMLButtonElement>,
    pageNum: number
  ): void => {
    e.preventDefault();
    setPageIng(pageNum);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="flex space-x-2">
      <button
        className="arrow hover:-translate-x-1"
        disabled={pageIng === 1}
        onClick={(e) => handlerPageIng(e, pageIng - 1)}
      >

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 fill-indigo-500">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
</svg>


      </button>
      {data?.goods?.map(({ id, ingredients, check }: Product) => (
        <label className="flex justify-center items-center flex-colm"
          key={id}         
        >
          <input 
            type="checkbox"
            checked={check ?? false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              CheckToggle(id, e.target.checked)
            }
          />

          {ingredients
            ? Array.isArray(ingredients)
              ? ingredients.join(", ")
              : ingredients
            : ""}
        </label>
      ))}
      <button
        className="arrow"
        disabled={pageIng === data?.totalPages}
        onClick={(e) => handlerPageIng(e, pageIng + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}

export default CheckboxIng;
