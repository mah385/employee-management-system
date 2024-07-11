package com.codersmecca.employeemanagementsystem.dto.requestbean;

import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppSortMetadata;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EmsUserRequestBeanWithPaginationAndSearchAndSort {

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

    private List<EmsAppSortMetadata> emsAppSortMetadataList = new ArrayList<>();

    @NotNull(message = "Please provide page number")
    private Integer pageNumber;

    @NotNull(message = "Please provide page size")
    private Integer pageSize;

}
