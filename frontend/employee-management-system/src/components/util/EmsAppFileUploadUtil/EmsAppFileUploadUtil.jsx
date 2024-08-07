import styles from "./EmsAppFileUploadUtil.module.css";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useState } from "react";
/*--------------------------------------------------------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*--------------------------------------------------------------------------------------------------------------------*/
import PropTypes from "prop-types";
/*--------------------------------------------------------------------------------------------------------------------*/
import EmsAppFormInput from "../../ems-app-form/EmsAppFormInput/EmsAppFormInput.jsx";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmpAppPathConstant from "../../../constants/emp-app-path-constant.js";
/*--------------------------------------------------------------------------------------------------------------------*/
import * as EmsUserApiRequestHandlerService from "../../../axios/ems-user/ems-user-api-request-handler-service.js";

/*--------------------------------------------------------------------------------------------------------------------*/

const EmsAppFileUploadUtil = (props) => {
  console.log("EmsAppFileUploadUtil (props.fileInputAccept): " + props.fileInputAccept);
  const navigate = useNavigate();
  const [uploadFileInfo, setUploadFileInfo] = useState({
    selectedFile: undefined,
    isFileSelected: false,
    isFileUploading: false,
  });

  const toggleFileUploadingStatus = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      isFileUploading: !prevState.isFileUploading,
    }));
  };

  const onSubmitHandleFormToUploadFile = async (e) => {
    e.preventDefault();
    toggleFileUploadingStatus();

    const callApiToImportEmsUserData = async () => {
      return await EmsUserApiRequestHandlerService.handleRequestToImportEmsUserData(uploadFileInfo.selectedFile);
    };
    callApiToImportEmsUserData()
      .then((successOrErrorResponseData) => {
        if (successOrErrorResponseData.statusCode === 200) {
          navigate(EmpAppPathConstant.PATH_DISPLAY_EMS_USER_ADVANCED);
        } /*else if (successOrErrorResponseData.statusCode !== 200) {
          // Perform some logic...
        }*/
      })
      .finally(() => {
        toggleFileUploadingStatus();
        onClickHandleRemoveUploadedFile();
      });
  };

  const onChangeHandleState = (e) => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: e.target.files[0],
      isFileSelected: true,
    }));
  };

  const onClickHandleRemoveUploadedFile = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: undefined,
      isFileSelected: false,
    }));
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToUploadFile(e)}
      className={`${styles.myFormContainer} d-flex flex-column justify-content-center align-items-center gap-2`}
    >
      <div>
        <EmsAppFormInput
          inputlabelwidthtype="XXXL"
          type="file"
          name="importDataFile"
          label={props.fileInputLabel}
          accept={props.fileInputAccept}
          onChange={(e) => onChangeHandleState(e)}
          required
        />
      </div>
      {uploadFileInfo.isFileSelected && (
        <div className="d-flex gap-5 mb-2">
          <button type="submit" className="border border-2 border-success btn btn-outline-success">
            Upload File
          </button>
          <button
            type="button"
            className="border border-2 border-danger btn btn-outline-danger"
            onClick={onClickHandleRemoveUploadedFile}
          >
            Remove File
          </button>
        </div>
      )}

      {uploadFileInfo.isFileUploading && (
        <div>
          <h1 className="display-6">Uploading File... Please Wait.</h1>
        </div>
      )}
    </form>
  );
};

export default EmsAppFileUploadUtil;

EmsAppFileUploadUtil.propTypes = {
  fileInputLabel: PropTypes.string,
  fileInputAccept: PropTypes.string,
};
