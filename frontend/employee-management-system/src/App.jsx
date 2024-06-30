import "./App.css";
/*-------------------------------------------------------------------*/
import { ToastContainer } from "react-toastify";
/*-------------------------------------------------------------------*/
import EmsAppHeader from "./components/ems-app-layout/EmsAppHeader/EmsAppHeader.jsx";
import EmsAppSidebar from "./components/ems-app-layout/EmsAppSidebar/EmsAppSidebar.jsx";
import EmsAppMain from "./components/ems-app-layout/EmsAppMain/EmsAppMain.jsx";

/*-------------------------------------------------------------------*/

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="grid-container">
        <EmsAppHeader />
        <EmsAppSidebar />
        <EmsAppMain />
      </div>
    </>
  );
}

export default App;
