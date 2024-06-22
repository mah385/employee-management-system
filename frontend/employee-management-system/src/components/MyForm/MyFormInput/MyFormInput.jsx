import stylesMyForm from "../MyForm.module.css";
// import styles from "./EmsErrorPage.module.css";
/*-------------------------------------------------------------------*/
import PropTypes from "prop-types";

/*-------------------------------------------------------------------*/

function MyFormInput(props) {
  return (
    <div
      className={`${stylesMyForm.inputContainer} input-group input-group-sm m-1`}
    >
      <div className={`${stylesMyForm.inputLabel} input-group-text`}>
        {props.label}
      </div>
      <input {...props} className={`${stylesMyForm.inputField} form-control`} />
    </div>

    /*
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
            </div>
            <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
        </div>
        */
  );
}

export default MyFormInput;

MyFormInput.propTypes = {
  label: PropTypes.string,
};
