package com.codersmecca.employeemanagementsystem.dto.requestbean;

import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppPaginationMetadataAndSortMetadataBean;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class EmsUserRequestBeanWithPaginationAndSortAndSearch {

    @Valid
    private EmsAppPaginationMetadataAndSortMetadataBean emsAppPaginationMetadataAndSortMetadataBean;

    private String searchValueForFirstName;
    private String searchValueForLastName;
    private EmsUserGender searchValueForEmsUserGender;
    private String searchValueForEmail;
    private String searchValueForDateOfBirth; //LocalDate
    private String searchValueForDateOfJoin; //LocalDate
    private BigDecimal searchValueForSalary;
    private BigDecimal searchValueForHikePercentage;
    private Integer searchValueForZipCode;
    private String searchValueForMobileNumber;

}
