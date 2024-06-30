import stylesMyForm from "../MyForm.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";

/*-------------------------------------------------------------------*/

function MyFormInput(props) {
  let inputLabelWidth;
  let inputContainerWidth;
  switch (props.inputlabelwidthtype) {
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
        <label>{props.label}</label>
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
