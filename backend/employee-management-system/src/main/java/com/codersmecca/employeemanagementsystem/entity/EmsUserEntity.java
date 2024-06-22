package com.codersmecca.employeemanagementsystem.entity;

import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tbl_ems_user")
public class EmsUserEntity extends EmsBaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "CHAR(36)")
    private String emsUserId;

    @Column
    private String emsUserFirstName;

    @Column
    private String emsUserLastName;

    @Enumerated(EnumType.STRING)
    @Column
    private EmsUserGender emsUserGender;

    @Column(unique = true)
    private String emsUserEmail;

    @Column
    private LocalDate emsUserDateOfBirth;

    @Column
    private LocalDate emsUserDateOfJoin;

    @Column
    private BigDecimal emsUserSalary;

    @Column
    private BigDecimal emsUserHikePercentage;

    @Column
    private Integer emsUserZipCode;

    @Column
    private String emsUserMobileNumber;

}
