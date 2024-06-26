import styles from "./ImportEmsUser.module.css";
/*-------------------------------------------------------------------*/
import { useState } from "react";
/*-------------------------------------------------------------------*/
import { useNavigate } from "react-router-dom";
/*-------------------------------------------------------------------*/
import MyFormInput from "../../MyForm/MyFormInput/MyFormInput.jsx";
/*-------------------------------------------------------------------*/
import * as EmsUserData from "../../../axios/ems_user/ems-user-data.js";
/*-------------------------------------------------------------------*/
import * as EmsUrlConstant from "../../../routes/EmsUrlConstant.js";

/*-------------------------------------------------------------------*/

const ImportEmsUser = () => {
  const navigate = useNavigate();
  console.log("ImportEmsUser");
  const [uploadFileInfo, setUploadFileInfo] = useState({
    selectedFile: undefined,
    isFileSelected: false,
    isFileUploading: false,
  });

  const onSubmitHandleFormToUploadFile = async (e) => {
    e.preventDefault();
    setUploadFileInfo((prevState) => ({
      ...prevState,
      isFileUploading: true,
    }));
    const responseData = await EmsUserData.importEmsUserUsingAxios(
      uploadFileInfo.selectedFile,
    );
    setUploadFileInfo((prevState) => ({
      ...prevState,
      isFileUploading: false,
    }));
    onClickHandleRemoveFile();
    if (responseData.statusCode === 200) {
      navigate(EmsUrlConstant.DISPLAY_EMS_USER_PATH);
    }
  };

  const onChangeHandleState = (e) => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: e.target.files[0],
      isFileSelected: true,
    }));
  };

  const onClickHandleRemoveFile = () => {
    setUploadFileInfo((prevState) => ({
      ...prevState,
      selectedFile: undefined,
      isFileSelected: false,
    }));
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandleFormToUploadFile(e)}
      className={`${styles.myFormContainer} h-100 d-flex flex-column justify-content-center align-items-center gap-4`}
    >
      <div>
        <MyFormInput
          inputlabelwidthtype="XXXL"
          type="file"
          name="importEmsUserFile"
          label="Upload EMS User Data File"
          accept=".csv"
          onChange={(e) => onChangeHandleState(e)}
          required
        />
      </div>
      <div className="d-flex gap-5">
        <button
          type="submit"
          className="border border-2 border-success btn btn-outline-success"
          disabled={!uploadFileInfo.isFileSelected}
        >
          Upload File
        </button>
        <button
          type="button"
          className="border border-2 border-danger btn btn-outline-danger"
          onClick={onClickHandleRemoveFile}
          disabled={!uploadFileInfo.isFileSelected}
        >
          Remove File
        </button>
      </div>
      <div>
        <h1 className="display-4">
          {uploadFileInfo.isFileUploading && "Uploading File... Please Wait."}
        </h1>
      </div>
    </form>
  );
};

export default ImportEmsUser;
