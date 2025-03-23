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
    <div>
      <div id="error-page">
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
