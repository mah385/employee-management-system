export const getInputLabelWidthBasedOnType = (inputLabelWidthType) => {
  let inputLabelWidth;
  switch (inputLabelWidthType) {
    case "XS": {
      inputLabelWidth = 100;
      break;
    }
    case "SM": {
      inputLabelWidth = 120;
      break;
    }
    case "MD": {
      inputLabelWidth = 140;
      break;
    }
    case "LG": {
      inputLabelWidth = 160;
      break;
    }
    case "XL": {
      inputLabelWidth = 180;
      break;
    }
    case "XXL": {
      inputLabelWidth = 200;
      break;
    }
    case "XXXL": {
      inputLabelWidth = 220;
      break;
    }
  }
  return {
    inputLabelWidth: inputLabelWidth,
    inputContainerWidth: inputLabelWidth * 3,
  };
};
