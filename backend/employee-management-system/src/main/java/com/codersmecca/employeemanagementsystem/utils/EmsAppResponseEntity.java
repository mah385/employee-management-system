package com.codersmecca.employeemanagementsystem.utils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class EmsAppResponseEntity {

    private Object payload;
    private Integer statusCode;
    private String statusRemarks;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();

    public EmsAppResponseEntity(
            final Object payload,
            final HttpStatus httpStatus,
            final String message
    ) {
        this.payload = payload;
        this.statusCode = httpStatus.value();
        this.statusRemarks = httpStatus.getReasonPhrase();
        this.message = message;
    }

}
