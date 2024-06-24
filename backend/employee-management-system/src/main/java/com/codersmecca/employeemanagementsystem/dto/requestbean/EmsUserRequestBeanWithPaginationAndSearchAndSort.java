package com.codersmecca.employeemanagementsystem.dto.requestbean;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class EmsUserRequestBeanWithPaginationAndSearchAndSort {

    private String searchFirstName;
    private String searchLastName;
    private EmsUserGender searchEmsUserGender;
    private String searchEmail;
    private LocalDate searchDateOfBirth;
    private LocalDate searchDateOfJoin;
    private BigDecimal searchSalary;
    private BigDecimal searchHikePercentage;
    private Integer searchZipCode;
    private String searchMobileNumber;

    private Sort.Direction sortDirectionForFirstName = null;
    private Sort.Direction sortDirectionForLastName = null;
    private Sort.Direction sortDirectionForEmsUserGender = null;
    private Sort.Direction sortDirectionForEmail = null;
    private Sort.Direction sortDirectionForDateOfBirth = null;
    private Sort.Direction sortDirectionForDateOfJoin = null;
    private Sort.Direction sortDirectionForSalary = null;
    private Sort.Direction sortDirectionForHikePercentage = null;
    private Sort.Direction sortDirectionForZipCode = null;
    private Sort.Direction sortDirectionForMobileNumber = null;

    @NotNull(message = "Please provide page number")
    private Integer pageNumber = 1;

    @NotNull(message = "Please provide page size")
    private Integer pageSize = 20;

}
