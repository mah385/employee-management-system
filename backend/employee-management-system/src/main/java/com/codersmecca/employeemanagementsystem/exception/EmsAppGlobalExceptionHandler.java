package com.codersmecca.employeemanagementsystem.exception;

import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseEntity;
import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class EmsAppGlobalExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<EmsAppResponseEntity> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException ex
    ) {
        ex.printStackTrace();
        Map<String, String> errorMap = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        return EmsAppResponseUtil.sendResponse(errorMap, HttpStatus.BAD_REQUEST, "Validation Failed: Please provide required fields");
    }

    @ExceptionHandler(value = EmsResourceNotFoundException.class)
    public ResponseEntity<EmsAppResponseEntity> handleEmsResourceNotFoundExceptionException(
            EmsResourceNotFoundException ex
    ) {
        ex.printStackTrace();
        return EmsAppResponseUtil.sendResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(value = MaxUploadSizeExceededException.class)
    public ResponseEntity<EmsAppResponseEntity> handleMaxUploadSizeExceededException(
            Exception ex
    ) {
        ex.printStackTrace();
        return EmsAppResponseUtil.sendResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<EmsAppResponseEntity> handleException(
            Exception ex
    ) {
        ex.printStackTrace();
        return EmsAppResponseUtil.sendResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

}
