import { ThreeCircles } from "react-loader-spinner";

/*-------------------------------------------------------------------*/

const EmsAppLoader = () => {
  return (
    <div className="h-100 align-content-center">
      <ThreeCircles
        visible={true}
        height="200"
        width="200"
        color="teal"
        ariaLabel="three-circles-loading"
        wrapperStyle={{ justifyContent: "center" }}
        // wrapperClass=""
      />
    </div>
  );
};

export default EmsAppLoader;
