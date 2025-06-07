import { useRouteError } from "react-router-dom";
interface RouterErrors {
  status?: string;
  statusText: string;
  message: string;
}
function ErrorPage(): JSX.Element {
  const error = useRouteError() as RouterErrors | Error;
  console.error(error);
  const errorMessage =
    "statusText" in error && error.statusText
      ? error.statusText
      : "message" in error && error.message
      ? error.message
      : "Unknow error";

  return (
    <div className=" ">
      <div className="flex flex-col justify-center text-center text-7xl text-red-600 space-y-5 font-bold bg-amber-100 min-h-screen ">
<img className="mx-auto max-w-[200px]" src="https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png" alt="alt" />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
