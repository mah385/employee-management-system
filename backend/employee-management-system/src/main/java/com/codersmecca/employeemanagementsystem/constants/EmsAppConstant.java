package com.codersmecca.employeemanagementsystem.constants;

import java.time.format.DateTimeFormatter;

public class EmsAppConstant {

    public static final Integer ZERO = 0;
    public static final Integer ONE = 1;
    public static final Integer TWO = 2;
    public static final Integer THREE = 3;
    public static final Integer FOUR = 4;
    public static final Integer FIVE = 5;
    public static final Integer SIX = 6;
    public static final Integer SEVEN = 7;
    public static final Integer EIGHT = 8;
    public static final Integer NINE = 9;
    public static final Integer TEN = 10;

    public static final String REGEX_FOR_ALPHANUMERIC = "[^a-zA-Z0-9]";
    public static final String REGEX_FOR_NUMBERS = "[^0-9]";
    public static final String REGEX_FOR_NUMBERS_WITH_DECIMAL = "[^0-9.]";

    public static final String EMPTY_STRING = "";

    public static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("[MM/dd/yyyy][M/d/yyyy]"); //DateTimeFormatter.ofPattern("[MM/dd/yyyy]" + "[dd-MM-yyyy]" + "[yyyy-MM-dd]");

}
