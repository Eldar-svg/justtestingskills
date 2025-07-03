import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className=" w-full flex  ">
            <li
              className="p-5 bg-blue-600 max-w-[500px]   rounded-2xl text-white text-xl space-y-5 "
              key={id}
            >
                 <input
                id={`input-${id}`}
                type="checkbox"
                checked={check ?? false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  if (CheckToggle && id) {
                    CheckToggle(id, e.target.checked);
                  }
                }}
                className="h-5 w-5"
              />
                    <NavLink
                to={`/products/${id}`}
                className="  hover:underline "
              >
                <span className="break-words">{title}</span>
              </NavLink>
              <p className=" float-left transition ease-in-out hover:-translate-y-1 hover:scale-110  ">
                <img
                  className="max-w-[300px]  m-5   "
                  src={image}
                  alt={title}
                />
              </p>
            
           

          

              <p className="break-words mb-3">
                <span>Description:</span> {description}
              </p>
              <p className="break-words">
                <span className="">Ingredients:</span> {ingredients.join(", ")}
              </p>
              <div className="mt-4">
                <CoffeBtns
                  logdata={logdata}
                  id={id}
                  deleteQuery={deleteQuery}
                />
              </div>
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EachCoffe;
