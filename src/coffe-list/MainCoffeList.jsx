import React from "react";
import { NavLink } from "react-router-dom";

function MainCoffeList({
  inputState,
  logdata,
  deleteQuery,
  toggleCheck,
  ingredientBox,
  currentItems
}) {
   
  return (
    <div>
      {currentItems
        .filter((prevSearch) => {
          const searchUpperCase = inputState.search.toLowerCase();

          const matchesSearch = prevSearch.title
            .toLowerCase()
            .includes(searchUpperCase);

          const matchesIngredient =
            ingredientBox.length === 0 || ingredientBox.includes(prevSearch.id);

          return matchesSearch && matchesIngredient; // Показываем только те элементы, которые соответствуют поисковому запросу и выбранным ингредиентам
        })
        .map(({ id, title, description, ingredients, image, check }) => {
          return (
            <>
              <ul
                style={{
                  display: "flexbox",
                  gap: "50px",

                  margin: "auto",
                  listStyle: "none",
                  marginTop: "50px",

                  alignItems: "stretch",
                }}
              >
                <li style={{ width: "50%" }} key={id}>
                  <input
                    type="checkbox"
                    checked={check}
                    onChange={(e) => toggleCheck(id, e.target.checked)}
                  />
                  <NavLink to={`/products/${id}`}>{title}</NavLink>
                  <p> {description}</p>
                  <p>{ingredients}</p>
                  <img
                    style={{
                      width: "300px",
                      height: "300px",
                    }}
                    src={image}
                    alt={title}
                    width="300"
                  />
                  {logdata === "admin" && (
                    <button
                      style={{ display: "flex" }}
                      onClick={() => deleteQuery(id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              </ul>
            </>
          );
        })}
    </div>
  );
}

export default MainCoffeList;
