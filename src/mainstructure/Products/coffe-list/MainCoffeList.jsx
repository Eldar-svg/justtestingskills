import EachCoffe from "./EachCoffe";
import usePaginatedProducts from "../../../hooks/usePaginatedProducts";
import { motion, AnimatePresence } from "framer-motion";
function MainCoffeList({
  inputState,
  logdata,
  deleteQuery,
  toggleCheck,
  ingredientBox,
    page
}) {
  const { data, error,isLoading } = usePaginatedProducts(page);
  console.log("Page in Pages:", page)
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  if (isLoading) return <div>Loading...</div>;

  // Проверка ошибки
  if (error) return <div>Error loading data: {error.message}</div>;

 
  const searchItems = (data) => {
    const searchUpperCase = inputState.search?.toLowerCase() || "";

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
        {data.goods
          ?.filter((prevSearch) => searchItems(prevSearch)) // Проверяем наличие данных
          .map((coffe) => (
            <motion.div
              key={coffe.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6 }}
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
