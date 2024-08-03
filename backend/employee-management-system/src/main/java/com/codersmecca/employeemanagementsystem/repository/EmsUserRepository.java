package com.codersmecca.employeemanagementsystem.repository;

import com.codersmecca.employeemanagementsystem.dto.projectionbean.GetEmsUserProjectionBean;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface EmsUserRepository extends JpaRepository<EmsUserEntity, String> {

    Optional<EmsUserEntity> findByEmsUserEmail(String email);

    boolean existsByEmsUserEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE EmsUserEntity eue " +
            "SET eue.emsUserFirstName=:firstName, eue.emsUserLastName=:lastName, eue.emsUserGender=:emsUserGender, eue.emsUserDateOfBirth=:dateOfBirth, " +
            "eue.emsUserDateOfJoin=:dateOfJoin, eue.emsUserSalary=:salary, eue.emsUserHikePercentage=:hikePercentage, eue.emsUserZipCode=:zipCode, eue.emsUserMobileNumber=:mobileNumber " +
            "WHERE eue.emsUserId=:userId ")
    void updateEmsUser(
            @Param(value = "firstName") String firstName,
            @Param(value = "lastName") String lastName,
            @Param(value = "emsUserGender") EmsUserGender emsUserGender,
            @Param(value = "dateOfBirth") LocalDate dateOfBirth,
            @Param(value = "dateOfJoin") LocalDate dateOfJoin,
            @Param(value = "salary") BigDecimal salary,
            @Param(value = "hikePercentage") BigDecimal hikePercentage,
            @Param(value = "zipCode") Integer zipCode,
            @Param(value = "mobileNumber") String mobileNumber,
            @Param(value = "userId") Long userId
    );

    @Query("SELECT NEW com.codersmecca.employeemanagementsystem.dto.projectionbean.GetEmsUserProjectionBean(eue.emsUserId, eue.emsUserFirstName, eue.emsUserLastName, eue.emsUserGender, " +
            "eue.emsUserEmail, eue.emsUserDateOfBirth, eue.emsUserDateOfJoin, eue.emsUserSalary, eue.emsUserHikePercentage, eue.emsUserZipCode, eue.emsUserMobileNumber) " +
            "FROM EmsUserEntity eue " +
            "WHERE ((:searchValueForFirstName IS NULL)      OR (:searchValueForFirstName IS NOT NULL        AND lower(eue.emsUserFirstName)             LIKE lower(concat('%', :searchValueForFirstName, '%')))) " +
            "AND ((:searchValueForLastName IS NULL)         OR (:searchValueForLastName IS NOT NULL         AND lower(eue.emsUserLastName)              LIKE lower(concat('%', :searchValueForLastName, '%')))) " +
            "AND ((:searchValueForEmsUserGender IS NULL)    OR (:searchValueForEmsUserGender IS NOT NULL    AND eue.emsUserGender=:searchValueForEmsUserGender)) " +
            "AND ((:searchValueForEmail IS NULL)            OR (:searchValueForEmail IS NOT NULL            AND lower(eue.emsUserEmail)                 LIKE lower(concat('%', :searchValueForEmail, '%')))) " +
            "AND ((:searchValueForDateOfBirth IS NULL)      OR (:searchValueForDateOfBirth IS NOT NULL      AND concat('', eue.emsUserDateOfBirth)      LIKE concat(:searchValueForDateOfBirth, '%'))) " +
            "AND ((:searchValueForDateOfJoin IS NULL)       OR (:searchValueForDateOfJoin IS NOT NULL       AND concat('', eue.emsUserDateOfJoin)       LIKE concat(:searchValueForDateOfJoin, '%'))) " +
            "AND ((:searchValueForSalary IS NULL)           OR (:searchValueForSalary IS NOT NULL           AND concat('', eue.emsUserSalary)           LIKE concat(:searchValueForSalary, '%'))) " +
            "AND ((:searchValueForHikePercentage IS NULL)   OR (:searchValueForHikePercentage IS NOT NULL   AND concat('', eue.emsUserHikePercentage)   LIKE concat(:searchValueForHikePercentage, '%'))) " +
            "AND ((:searchValueForZipCode IS NULL)          OR (:searchValueForZipCode IS NOT NULL          AND concat('', eue.emsUserZipCode)          LIKE concat('%', :searchValueForZipCode, '%'))) " +
            "AND ((:searchValueForMobileNumber IS NULL)     OR (:searchValueForMobileNumber IS NOT NULL     AND eue.emsUserMobileNumber                 LIKE concat('%', :searchValueForMobileNumber, '%'))) ")
    Page<GetEmsUserProjectionBean> findAllEmsUserWithPaginationAndSearchAndSort(
            @Param(value = "searchValueForFirstName") String searchValueForFirstName,
            @Param(value = "searchValueForLastName") String searchValueForLastName,
            @Param(value = "searchValueForEmsUserGender") EmsUserGender searchValueForEmsUserGender,
            @Param(value = "searchValueForEmail") String searchValueForEmail,
            @Param(value = "searchValueForDateOfBirth") String searchValueForDateOfBirth,
            @Param(value = "searchValueForDateOfJoin") String searchValueForDateOfJoin,
            @Param(value = "searchValueForSalary") BigDecimal searchValueForSalary,
            @Param(value = "searchValueForHikePercentage") BigDecimal searchValueForHikePercentage,
            @Param(value = "searchValueForZipCode") Integer searchValueForZipCode,
            @Param(value = "searchValueForMobileNumber") String searchValueForMobileNumber,
            Pageable pageable
    );

}
