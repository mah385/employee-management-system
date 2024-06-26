import stylesMyForm from "../MyForm.module.css";
// import styles from "./EmsErrorPage.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";

/*-------------------------------------------------------------------*/

function MyFormInput(props) {
  let inputLabelWidth;
  let inputContainerWidth;
  switch (props.inputlabelwidthtype) {
    case "XS": {
      inputLabelWidth = 80;
      break;
    }
    case "SM": {
      inputLabelWidth = 100;
      break;
    }
    case "MD": {
      inputLabelWidth = 120;
      break;
    }
    case "LG": {
      inputLabelWidth = 140;
      break;
    }
    case "XL": {
      inputLabelWidth = 160;
      break;
    }
    case "XXL": {
      inputLabelWidth = 180;
      break;
    }
    case "XXXL": {
      inputLabelWidth = 200;
      break;
    }
  }
  inputContainerWidth = inputLabelWidth * 3;
  return (
    <div
      className={`${stylesMyForm.inputContainer} input-group input-group-sm m-1`}
      style={{ width: `${inputContainerWidth}px` }}
    >
      <div
        className={`${stylesMyForm.inputLabel} input-group-text`}
        style={{ width: `${inputLabelWidth}px` }}
      >
        {props.label}
      </div>
      <input {...props} className={`${stylesMyForm.inputField} form-control`} />
    </div>
  );
}

export default MyFormInput;

MyFormInput.propTypes = {
  label: PropTypes.string,
  inputlabelwidthtype: PropTypes.string,
};
