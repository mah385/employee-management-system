package com.codersmecca.employeemanagementsystem.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmsUserGender {

    MALE("Male"),
    FEMALE("Female"),
    OTHER("Other");

    private final String label;

}
