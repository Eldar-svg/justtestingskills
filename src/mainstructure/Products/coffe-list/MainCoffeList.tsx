import EachCoffe from "./EachCoffe";
import usePaginatedProducts  from "../../../hooks/usePaginatedProducts";
import { motion, AnimatePresence } from "framer-motion";
import { TodoItem } from "../../../hooks/useReduceStates";
import { InputState } from "../../../hooks/useToggleHook";
 import { DataContextStart } from "../../../App";

export interface MainCoffeStuff extends DataContextStart {
  inputState: InputState;
  page: number;
  ingredientBox: string[];
   
}

function MainCoffeList({
  inputState,
  logdata,
  deleteQuery,
  toggleCheck,
  ingredientBox,
  page
}: MainCoffeStuff): JSX.Element {
  const { data, error, isLoading } = usePaginatedProducts(page)
  console.log("Page in Pages:", page);
  const itemVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) return <div>Loading...</div>;

  // Проверка ошибки
  if (error) return <div>Error loading data: {error.message}</div>;

  const searchItems = (data: TodoItem): boolean => {
    const searchUpperCase = inputState.search?.toString().toLowerCase() || "";

    const matchesSearch =
      data.title?.toLowerCase().includes(searchUpperCase) ?? false;

    const matchesIngredient =
      Array.isArray(ingredientBox) &&
      (ingredientBox.length === 0 || ingredientBox.includes(data.id));

    return matchesSearch && matchesIngredient;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      <AnimatePresence>
        {/* {data.goods.map(
          (
            product // Теперь data существует, можно обращаться к products
          ) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
               
            </div>
          )
        )} */}
        {data?.goods
          ?.filter((prevSearch) => searchItems(prevSearch)) // Проверяем наличие данных
          .map((coffe) => (
            <motion.div
              key={coffe.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="p-4 mb-2 bg-gray-100 rounded shadow"
            >
              <EachCoffe
                {...coffe}
                check={coffe.check}
                key={coffe.id}
                logdata={logdata}
                deleteQuery={deleteQuery}
                toggleCheck={toggleCheck}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default MainCoffeList;
