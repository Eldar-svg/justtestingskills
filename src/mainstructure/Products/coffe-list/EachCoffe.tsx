import { NavLink } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
 import CoffeBtns from "./CoffeBtns";
interface EachCoffeProps {
  id?: string;
  title: string;
  ingredients: string[];
  description: string;
  image: string;
  check?: boolean;
  logdata: string | null;
  deleteQuery: ((id: string) => void) | null;
  CheckToggle?:(id: string, value: boolean) => void
}

function EachCoffe({
  id,
  title,
  description,
  ingredients,
  image,
  check,
  logdata,
  deleteQuery,
  CheckToggle
}: EachCoffeProps): JSX.Element {
  return (
    <div className=""
    >
      <AnimatePresence>
        <div
          style={{
            display: "flex",
            flexDirection: "row", // Выравниваем элементы по вертикали
            alignItems: "center", // Центрируем дочерние элементы по горизонтали
            maxWidth: "100%",
            borderRadius: "10px",
            backgroundColor: "pink",
            padding: "20px", // Отступы для удобства
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Тень для улучшения визуала
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column", // Выравниваем список по вертикали
              listStyle: "none",
              justifyContent: "center",
              alignItems: "center", // Центрируем элементы списка
              width: "100%",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column", // Изменил на column, чтобы элементы шли вертикально
                maxWidth: "100%",
                borderRadius: "10px",
                backgroundColor: "pink",
                padding: "10px", // Добавил немного отступов для улучшения внешнего вида
              }}
              key={id}
            >
              <input
                type="checkbox"
                checked={check ?? false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  CheckToggle!(id!, e.target.checked)
                }
              />
              <NavLink to={`/products/${id}`} style={{ marginBottom: "10px" }}>
                Name: {title}
              </NavLink>
              <p>Description: {description}</p>
              <img
                style={{
                  width: "300px",
                  height: "300px",
                  marginBottom: "10px", // Добавил отступы для визуальной красоты
                }}
                src={image}
                alt={title}
              />
              <p>Ingredients: {ingredients}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
               <CoffeBtns logdata={logdata} id={id} deleteQuery={deleteQuery}/>
              </div>
            </li>
          </ul>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default EachCoffe;
