package com.codersmecca.employeemanagementsystem.dto.responsebean;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetEmsUserResponseBean {

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
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

}
