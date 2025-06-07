import CheckboxIng from "./CheckboxIng";
import { MainFunctionResult } from "./MainFunck";
type CheckboxsProps = Omit<
  MainFunctionResult,
  | "inputState"
  | "addImg"
  | "fetchAgain"
  | "handlePost"
  | "inputToggle"
  | "handlerinput"
  | "toCloseModal"
>;

function Checkboxs({
  handlerScrollUp,
  page,
  CheckToggle,
  handleAll,
  BtnDelete,
  logdata,
}: CheckboxsProps) {
  return (
    <div className="w-full flex  gap-5 bg-red-400 text-center items-center shadow-xl rounded-2xl  ">
      <form className=" mx-auto ">
        <label htmlFor="d">
          <span className="flex justify-center text-2xl">
            <p className="p-3">Choose All:</p>
            <input
              className="accent-pink-500"
              type="checkbox"
              id="d"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleAll(e.target.checked)
              }
            />
          </span>
        </label>
        <CheckboxIng
          CheckToggle={CheckToggle}
          handlerScrollUp={handlerScrollUp}
          page={page}
        />
        {logdata === "admin" && (
          <button
            className="m-2 p-3 relative group overflow-hidden bg-red-900 cursor-pointer  text-white rounded-2xl min-w-[100px] uppercase"
            onClick={BtnDelete}
          >
            <span className="absolute inset-0 bg-red-700 rounded-2xl scale-0 group-hover:scale-100 transition-transform duration-300"/>
             <span className="relative z-10 group-hover:text-black">Clear</span>
               
         
         
          </button>
        )}
      </form>
    </div>
  );
}

export default Checkboxs;
