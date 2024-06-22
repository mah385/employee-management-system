import stylesMyForm from "../MyForm.module.css";
// import styles from "./MyFormSelect.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";

/*-------------------------------------------------------------------*/

function MyFormSelect(props) {
  return (
    <div
      className={`${stylesMyForm.inputContainer} input-group input-group-sm m-1`}
    >
      <div className={`${stylesMyForm.inputLabel} input-group-text`}>
        {props.label}
      </div>
      <select {...props} className={`${stylesMyForm.inputField} form-select`}>
        <option>Please Select</option>
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
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
};
