import stylesMyForm from "../ems-app-form.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";
/*-------------------------------------------------------------------*/
import { getInputLabelWidthBasedOnType } from "../ems-app-form-input-label-width-type.js";

/*-------------------------------------------------------------------*/

function EmsAppFormInput(props) {
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
        <label>{props.label}</label>
      </div>
      <input {...props} className={`${stylesMyForm.inputField} form-control`} />
    </div>
  );
}

export default EmsAppFormInput;

EmsAppFormInput.propTypes = {
  label: PropTypes.string,
  inputlabelwidthtype: PropTypes.string,
};
