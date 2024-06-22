package com.codersmecca.employeemanagementsystem.repository;

import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import jakarta.transaction.Transactional;
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

}
