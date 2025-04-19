import React from "react";
import usePaginatedProducts from "../../../hooks/usePaginatedProducts";

interface CheckBoxResult {
  CheckToggle: (id: string, value: boolean) => void;
}

interface Product {
  id: string;
  ingredients: string | string[];
  check?: boolean;
}

function CheckboxIng({ CheckToggle }: CheckBoxResult): JSX.Element {
  const { data, isLoading, error } = usePaginatedProducts(0);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
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
    </div>
  );
}

export default CheckboxIng;