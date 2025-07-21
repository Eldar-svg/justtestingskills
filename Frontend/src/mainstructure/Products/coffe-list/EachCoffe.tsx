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
              className="flex flex-col p-5 bg-blue-600 max-w-[500px]   rounded-2xl text-white text-xl space-y-5 "
              key={id}
            >
              <div className="">
                {" "}
                <input
                  id={`input-${id}`}
                  type="checkbox"
                  checked={check ?? false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    if (CheckToggle && id) {
                      CheckToggle(id, e.target.checked);
                    }
                  }}
                  className="h-5 w-5 "
                />
                <NavLink
                  to={`/products/${id}`}
                  className=" w-full hover:underline "
                >
                  <span className="flex items-center justify-center break-words">
                    {title}
                  </span>
                </NavLink>
              </div>

              <div >
               
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
                    <span className="break-words">Ingredients:</span> 
                    {ingredients.join(", ")}
                  </p>
               
              </div>
              <CoffeBtns logdata={logdata} id={id} deleteQuery={deleteQuery} />
            </li>
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EachCoffe;
