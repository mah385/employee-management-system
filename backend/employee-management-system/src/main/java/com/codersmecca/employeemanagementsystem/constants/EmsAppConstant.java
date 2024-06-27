package com.codersmecca.employeemanagementsystem.constants;

import com.codersmecca.employeemanagementsystem.config.EmsAppConfig;

import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.http.HttpHeaders.*;
import static org.springframework.http.HttpMethod.*;

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

    public static final List<String> ALLOWED_HEADERS_LIST = List.of(
            ACCEPT,
            ACCESS_CONTROL_ALLOW_CREDENTIALS,
            ACCESS_CONTROL_ALLOW_HEADERS,
            ACCESS_CONTROL_ALLOW_METHODS,
            ACCESS_CONTROL_ALLOW_ORIGIN,
            ACCESS_CONTROL_EXPOSE_HEADERS,
            ACCESS_CONTROL_MAX_AGE,
            ACCESS_CONTROL_REQUEST_HEADERS,
            ACCESS_CONTROL_REQUEST_METHOD,
            AUTHORIZATION,
            CONTENT_DISPOSITION,
            CONTENT_RANGE,
            CONTENT_TYPE,
            ORIGIN,
            EmsAppConfig.X_REQUESTED_WITH
    );

    public static final List<String> ALLOWED_METHODS_LIST = List.of(
            DELETE.name(),
            GET.name(),
            OPTIONS.name(),
            PATCH.name(),
            POST.name(),
            PUT.name()
    );

    public static final List<String> EXPOSED_HEADERS_LIST = List.of(
            ACCEPT,
            ACCESS_CONTROL_ALLOW_CREDENTIALS,
//            ACCESS_CONTROL_ALLOW_HEADERS,
//            ACCESS_CONTROL_ALLOW_METHODS,
            ACCESS_CONTROL_ALLOW_ORIGIN,
//            ACCESS_CONTROL_EXPOSE_HEADERS,
//            ACCESS_CONTROL_MAX_AGE,
            ACCESS_CONTROL_REQUEST_HEADERS,
            ACCESS_CONTROL_REQUEST_METHOD,
            AUTHORIZATION,
            CONTENT_DISPOSITION,
//            CONTENT_RANGE,
            CONTENT_TYPE,
            ORIGIN,
            EmsAppConfig.X_REQUESTED_WITH
    );

}
