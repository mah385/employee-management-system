package com.codersmecca.employeemanagementsystem.utils;

import com.codersmecca.employeemanagementsystem.exception.EmsResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class EmsAppResponseUtil {

    public static ResponseEntity<EmsAppResponseEntity> sendResponse(
            final Object payload,
            final HttpStatus httpStatus,
            final String message
    ) {
        return new ResponseEntity<>(new EmsAppResponseEntity(payload, httpStatus, message), httpStatus);
    }

    public static ResponseEntity<EmsAppResponseEntity> sendResponse(
            final HttpStatus httpStatus,
            final String message
    ) {
        return sendResponse(null, httpStatus, message);
    }

    public static EmsResourceNotFoundException sendWorldGeographyResourceNotFoundException(
            final String message
    ) {
        return EmsResourceNotFoundException.builder().message(message).build();
    }

}
