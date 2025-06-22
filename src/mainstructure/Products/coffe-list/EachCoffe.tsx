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
  CheckToggle?: (id: string, value: boolean) => void;
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
  CheckToggle,
}: EachCoffeProps): JSX.Element {
  return (
      
    <div className="flex justify-center items-center">
 
      <AnimatePresence>
        <div  >
        
            <ul className="flex flex-col">
                 
              <li className="p-10 bg-blue-500 rounded-2xl" key={id}>
                <input
                  id="input1"
                  type="checkbox"
                  checked={check ?? false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    CheckToggle!(id!, e.target.checked)
                  }
                />  
                <NavLink
                  to={`/products/${id}`}
                  style={{ marginBottom: "10px" }}
                >
                  Name: {title}
                </NavLink>
                <img className="max-w-[300px] p-1 m-2 float-left" src={image} alt={title} />
                <p>Description: {description}</p>
               
                <p>Ingredients: {ingredients}</p>
                <div>
                  <CoffeBtns
                    logdata={logdata}
                    id={id}
                    deleteQuery={deleteQuery}
                  />
                </div>
          </li>
            </ul>
          
        </div>
      </AnimatePresence> 
    </div>
  );
}

export default EachCoffe;
