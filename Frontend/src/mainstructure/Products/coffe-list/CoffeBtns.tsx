import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface CoffeBtnsAction {
  logdata: String | null;
  id?: string;
  deleteQuery: ((id: string) => void) | null;
}

function CoffeBtns({ logdata, id, deleteQuery }: CoffeBtnsAction) {
  return (
    <div>
      {logdata === "admin" && (
        <div className="flex items-center justify-center space-x-5 ">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={() => deleteQuery?.(id!)}
            style={{
              maxWidth: "50%",
            }}
            className="mainbtn"
            
            
          >
            Delete
          </motion.button>

          <NavLink to={`/products/edit-product/${id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              style={{
                maxWidth: "200%",
              }}
              className="mainbtn"
            >
              Edit
            </motion.button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default CoffeBtns;
