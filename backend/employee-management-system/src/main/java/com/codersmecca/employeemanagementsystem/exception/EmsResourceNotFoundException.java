package com.codersmecca.employeemanagementsystem.exception;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsResourceNotFoundException extends  RuntimeException{

    private String message;

}
