import { ThreeCircles } from "react-loader-spinner";

/*-------------------------------------------------------------------*/

const getRandomColor = () => {
  const colorList = [
    "blue",
    "green",
    "orange",
    "purple",
    "brown",
    "black",
    "gold",
    "teal",
  ];
  return colorList[Math.floor(Math.random() * colorList.length)];
};

const EmsAppLoader = () => {
  return (
    <div className="h-100 align-content-center">
      <ThreeCircles
        visible={true}
        height="200"
        width="200"
        color={getRandomColor()}
        ariaLabel="three-circles-loading"
        wrapperStyle={{ justifyContent: "center" }}
        // wrapperClass=""
      />
    </div>
  );
};

export default EmsAppLoader;
