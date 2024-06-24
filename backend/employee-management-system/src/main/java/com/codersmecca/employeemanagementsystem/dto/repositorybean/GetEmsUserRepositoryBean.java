package com.codersmecca.employeemanagementsystem.dto.repositorybean;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class GetEmsUserRepositoryBean {

    private String id;
    private String firstName;
    private String lastName;
    private EmsUserGender emsUserGender;
    private String email;
    private LocalDate dateOfBirth;
    private LocalDate dateOfJoin;
    private BigDecimal salary;
    private BigDecimal hikePercentage;
    private Integer zipCode;
    private String mobileNumber;

    public GetEmsUserRepositoryBean(String id, String firstName, String lastName, EmsUserGender emsUserGender, String email, LocalDate dateOfBirth, LocalDate dateOfJoin, BigDecimal salary, BigDecimal hikePercentage, Integer zipCode, String mobileNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emsUserGender = emsUserGender;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.dateOfJoin = dateOfJoin;
        this.salary = salary;
        this.hikePercentage = hikePercentage;
        this.zipCode = zipCode;
        this.mobileNumber = mobileNumber;
    }

}
