import EachCoffe from "./EachCoffe";

function MainCoffeList({
  inputState,
  logdata,
  deleteQuery,
  toggleCheck,
  ingredientBox,
  currentItems,
}) {
  const searchItems = (data) => {
    const searchUpperCase = inputState.search.toLowerCase();

    const matchesSearch = data.title.toLowerCase().includes(searchUpperCase);

    const matchesIngredient =
      ingredientBox.length === 0 || ingredientBox.includes(data.id);
    return matchesSearch && matchesIngredient;
  };

  return (
    <div>
      {currentItems
        .filter((prevSearch) => {
          return searchItems(prevSearch);
        })
        .map((coffe) => {
          return (
            <>
              <EachCoffe
                {...coffe}
                check={coffe.check}
                key={coffe.key}
                logdata={logdata}
                deleteQuery={deleteQuery}
                toggleCheck={toggleCheck}
              />
            </>
          );
        })}
    </div>
  );
}

export default MainCoffeList;
