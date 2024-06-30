import stylesMyForm from "../ems-app-form.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";
/*-------------------------------------------------------------------*/
import { getInputLabelWidthBasedOnType } from "../ems-app-form-input-label-width-type.js";

/*-------------------------------------------------------------------*/

function EmsAppFormSelect(props) {
  const inputLabelWidthBasedOnType = getInputLabelWidthBasedOnType(
    props.inputlabelwidthtype,
  );
  return (
    <div
      className={`${stylesMyForm.inputContainer} input-group input-group-sm m-1`}
      style={{ width: `${inputLabelWidthBasedOnType.inputContainerWidth}px` }}
    >
      <div
        className={`${stylesMyForm.inputLabel} input-group-text`}
        style={{ width: `${inputLabelWidthBasedOnType.inputLabelWidth}px` }}
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

export default EmsAppFormSelect;

EmsAppFormSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  inputlabelwidthtype: PropTypes.string,
};
