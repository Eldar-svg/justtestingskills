import Root from "./Root";
import useToggleHook from "./hooks/useToggleHook";
 
import { useRef, useState, createContext } from "react";
import useQueryFetch from "./hooks/useQueryFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainFunck from "./mainstructure/Products/Produt/MainFunck";
import Layout from "./Layout";
import MainCoffeList from "./mainstructure/Products/coffe-list/MainCoffeList";
import Pages from "./mainstructure/Products/coffe-list/Pages";
import useFetchHooks from "./hooks/useFetchHooks";
import { ListofToggleHook } from "./mainstructure/Products/Produt/ListofToggleHook";
 
export interface DataContextStart {
 
  logdata: string | null;

}
 
export const DataContext = createContext<DataContextStart>({
  logdata: null

});

function App(): JSX.Element {
  const [page, setPage] = useState<number>(1);
 
  const {
    handlePost,
    deleteQuery,
    fetchAgain,
    CheckToggle,
    handleAll,
    BtnDelete,
  } = useQueryFetch();
  const { ingredientBox, addImg } = useFetchHooks();
  const reff = useRef<HTMLDivElement | null>(null);
  const logdata = localStorage.getItem("role");

  const { inputToggle, inputState, handlerinput } =
    useToggleHook<ListofToggleHook>({
      id: "",
      title: "",
      description: "",
      fresh: "",
      image: "",
      search: "",
      ingredients: "",
      openSearch: false,
      openForm: false,
      CloseModal: true,
      OpenModal: false,
    });

  const handlerScrollUp = (pageNum: number): void => {
    setPage(pageNum);
    if (reff.current) {
      reff.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toCloseModal = () => inputToggle("CloseModal");

  return (
    <>
    <ToastContainer
        stacked
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <div ref={reff}  >
       
      <Root />
      
      <MainFunck
        handlerScrollUp={handlerScrollUp}
        inputToggle={inputToggle}
        handlePost={handlePost}
        handlerinput={handlerinput}
        addImg={addImg}
        logdata={logdata}
        toCloseModal={toCloseModal}
        fetchAgain={fetchAgain}
        page={page}
        inputState={inputState}
        CheckToggle={CheckToggle}
        handleAll={handleAll}
        BtnDelete={BtnDelete}
      />
      <Layout />
      <MainCoffeList
        inputState={inputState}
        logdata={logdata}
        deleteQuery={deleteQuery}
        ingredientBox={ingredientBox}
        page={page}
        CheckToggle={CheckToggle}
      />
      <Pages page={page} handlerScrollUp={handlerScrollUp} /> 
</div>
     </>
  );
}

export default App;
