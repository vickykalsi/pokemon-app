import { useRouteError } from "react-router-dom";

function ErrorComponent() {
  const globalRouteError=useRouteError();
  return <>
    <h1>Error encountered : {globalRouteError.statusText || globalRouteError.message || `Something went wrong`}</h1>
  </>
}

export default ErrorComponent;