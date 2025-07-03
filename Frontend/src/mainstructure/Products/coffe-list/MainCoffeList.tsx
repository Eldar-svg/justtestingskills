import EachCoffe from "./EachCoffe";
import usePaginatedProducts  from "../../../hooks/usePaginatedProducts";
import { motion, AnimatePresence } from "framer-motion";
import { TodoItem } from "../../../hooks/useReduceStates";
 import { DataContextStart } from "../../../App";
import { ListofToggleHook } from "../Produt/ListofToggleHook";

export interface MainCoffeStuff extends DataContextStart {
  inputState: ListofToggleHook;
  page: number;
  ingredientBox: string[];
  CheckToggle: (id: string, value: boolean) => void;
 deleteQuery: ((id: string) => void) | null;
}


function MainCoffeList({
  inputState,
  logdata,
  deleteQuery,
  CheckToggle,
   ingredientBox,
  page
}: MainCoffeStuff): JSX.Element {
  const { data, error, isLoading } = usePaginatedProducts("goods",page)
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
     className="flex space-x-5 justify-center"
    >
      <AnimatePresence>
       
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
              className="  p-4 mb-5 bg-gray-100 rounded shadow"
            >
              <EachCoffe
                {...coffe}
                check={coffe.check ?? false}
                key={coffe.id}
                logdata={logdata}
                deleteQuery={deleteQuery}
                CheckToggle={CheckToggle}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default MainCoffeList;
