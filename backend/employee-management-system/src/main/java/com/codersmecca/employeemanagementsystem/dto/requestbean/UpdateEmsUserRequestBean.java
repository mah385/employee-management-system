package com.codersmecca.employeemanagementsystem.dto.requestbean;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class UpdateEmsUserRequestBean {

    @NotNull(message = "Id is Required")
    private Long id;

    @NotBlank(message = "First Name is Blank")
    @NotNull(message = "First Name is Required")
    private String firstName;

    private String lastName;

    @NotNull(message = "User Gender is Required")
    private EmsUserGender emsUserGender;

    @NotNull(message = "Date Of Birth is Required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Date Of Join is Required")
    private LocalDate dateOfJoin;

    @NotNull(message = "salary is Required")
    private BigDecimal salary;

    private BigDecimal hikePercentage;

    @NotNull(message = "Zip Code is Required")
    private Integer zipCode;

    @NotBlank(message = "Mobile Number is Blank")
    @NotNull(message = "Mobile Number is Required")
    private String mobileNumber;

}
