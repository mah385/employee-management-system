package com.codersmecca.employeemanagementsystem.dto.requestbean;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;

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

    private Sort.Direction sortDirectionForFirstName = null;
    private Sort.Direction sortDirectionForLastName = null;
    private Sort.Direction sortDirectionForEmsUserGender = null;
    private Sort.Direction sortDirectionForEmail = null;
    private Sort.Direction sortDirectionForDateOfBirth = null;
    private Sort.Direction sortDirectionForDateOfJoin = null;
    private Sort.Direction sortDirectionForSalary = null;
    private Sort.Direction sortDirectionForHikePercentage = null;
    private Sort.Direction sortDirectionForZipCode = null;

    @NotNull(message = "Please provide page number")
    private Integer pageNumber;

    @NotNull(message = "Please provide page size")
    private Integer pageSize;

}
