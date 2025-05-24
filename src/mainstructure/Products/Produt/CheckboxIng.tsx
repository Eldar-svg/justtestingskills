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

function CheckboxIng({
  CheckToggle,
  handlerScrollUp,
  page,
}: CheckBoxResult): JSX.Element {
  const [pageIng, setPageIng] = useState(1);
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <button
        disabled={pageIng === 1}
        onClick={(e) => handlerPageIng(e, pageIng - 1)}
      >
        Prev
      </button>
      {data?.goods?.map(({ id, ingredients, check }: Product) => (
        <label
          key={id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            minWidth: "120px",
          }}
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
        disabled={pageIng === data?.totalPages}
        onClick={(e) => handlerPageIng(e, pageIng + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default CheckboxIng;
