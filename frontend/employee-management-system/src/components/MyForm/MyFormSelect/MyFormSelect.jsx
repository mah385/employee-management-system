import stylesMyForm from "../MyForm.module.css";
// import styles from "./MyFormSelect.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";

/*-------------------------------------------------------------------*/

function MyFormSelect(props) {
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
      <select {...props} className={`${stylesMyForm.inputField} form-select`}>
        <option value={null}>Please Select</option>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default MyFormSelect;

MyFormSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  inputlabelwidthtype: PropTypes.string,
};
