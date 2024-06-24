package com.codersmecca.employeemanagementsystem.repository;

import com.codersmecca.employeemanagementsystem.dto.repositorybean.GetEmsUserRepositoryBean;
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
            @Param(value = "userId") String userId
    );

    @Query("SELECT NEW com.codersmecca.employeemanagementsystem.dto.repositorybean.GetEmsUserRepositoryBean(eue.emsUserId, eue.emsUserFirstName, eue.emsUserLastName, eue.emsUserGender, " +
            "eue.emsUserEmail, eue.emsUserDateOfBirth, eue.emsUserDateOfJoin, eue.emsUserSalary, eue.emsUserHikePercentage, eue.emsUserZipCode, eue.emsUserMobileNumber) " +
            "FROM EmsUserEntity eue " +
            "WHERE ((:searchFirstName IS NULL) OR (:searchFirstName IS NOT NULL AND lower(eue.emsUserFirstName) LIKE lower(concat('%',:searchFirstName,'%')))) " +
            "AND ((:searchLastName IS NULL) OR (:searchLastName IS NOT NULL AND lower(eue.emsUserLastName) LIKE lower(concat('%',:searchLastName,'%')))) " +
            "AND ((:searchEmsUserGender IS NULL) OR (:searchEmsUserGender IS NOT NULL AND eue.emsUserGender=:searchEmsUserGender)) " +
            "AND ((:searchEmail IS NULL) OR (:searchEmail IS NOT NULL AND lower(eue.emsUserEmail) LIKE lower(concat('%',:searchEmail,'%')))) " +
            "AND ((:searchDateOfBirth IS NULL) OR (:searchDateOfBirth IS NOT NULL AND eue.emsUserDateOfBirth=:searchDateOfBirth)) " +
            "AND ((:searchDateOfJoin IS NULL) OR (:searchDateOfJoin IS NOT NULL AND eue.emsUserDateOfJoin=:searchDateOfJoin)) " +
            "AND ((:searchSalary IS NULL) OR (:searchSalary IS NOT NULL AND concat('',eue.emsUserSalary) LIKE concat(:searchSalary,'%'))) " +
            "AND ((:searchHikePercentage IS NULL) OR (:searchHikePercentage IS NOT NULL AND concat('',eue.emsUserHikePercentage) LIKE concat(:searchHikePercentage,'%'))) " +
            "AND ((:searchZipCode IS NULL) OR (:searchZipCode IS NOT NULL AND concat('',eue.emsUserZipCode) LIKE concat('%',:searchZipCode,'%'))) " +
            "AND ((:searchMobileNumber IS NULL) OR (:searchMobileNumber IS NOT NULL AND eue.emsUserMobileNumber LIKE concat('%',:searchMobileNumber,'%'))) ")
    Page<GetEmsUserRepositoryBean> findAllEmsUserWithPaginationAndSearchAndSort(
            @Param(value = "searchFirstName") String searchFirstName,
            @Param(value = "searchLastName") String searchLastName,
            @Param(value = "searchEmsUserGender") EmsUserGender searchEmsUserGender,
            @Param(value = "searchEmail") String searchEmail,
            @Param(value = "searchDateOfBirth") LocalDate searchDateOfBirth,
            @Param(value = "searchDateOfJoin") LocalDate searchDateOfJoin,
            @Param(value = "searchSalary") BigDecimal searchSalary,
            @Param(value = "searchHikePercentage") BigDecimal searchHikePercentage,
            @Param(value = "searchZipCode") Integer searchZipCode,
            @Param(value = "searchMobileNumber") String searchMobileNumber,
            Pageable pageable
    );

}
