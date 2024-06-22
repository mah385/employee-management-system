package com.codersmecca.employeemanagementsystem.utils;

import com.codersmecca.employeemanagementsystem.exception.EmsResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class EmsResponseUtil {

    public static ResponseEntity<EmsResponseEntity> sendResponse(
            final Object payload,
            final HttpStatus httpStatus,
            final String message
    ) {
        return new ResponseEntity<>(new EmsResponseEntity(payload, httpStatus, message), httpStatus);
    }

    public static ResponseEntity<EmsResponseEntity> sendResponse(
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
