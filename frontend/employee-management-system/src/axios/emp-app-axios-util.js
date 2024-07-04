import { toast } from "react-toastify";

/*-------------------------------------------------------------------*/

// ["message", "payload", "statusCode", "statusRemarks", "timestamp"];

export const handleSuccessResponseUtil = (showToast, successResponse) => {
  if (showToast) {
    toast.success(successResponse.data.message);
  }
  return successResponse.data;
};

export const handleErrorResponseUtil = (showToast, errorResponse) => {
  console.log(errorResponse);
  if (showToast) {
    toast.error(
      errorResponse.response.data.statusCode !== 500
        ? errorResponse.response.data.message
        : errorResponse.response.data.statusRemarks,
    );
  }
  return errorResponse.response.data;
};
