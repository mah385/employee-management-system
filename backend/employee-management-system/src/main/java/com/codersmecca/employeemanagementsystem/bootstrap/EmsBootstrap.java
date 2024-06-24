package com.codersmecca.employeemanagementsystem.bootstrap;

import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import com.codersmecca.employeemanagementsystem.repository.EmsUserRepository;
import com.codersmecca.employeemanagementsystem.utils.EmsUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class EmsBootstrap {

    private final EmsUserRepository emsUserRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void applicationReady() {
//        initEmsUser();
    }

    private void initEmsUser() {
        if (this.emsUserRepository.count() == 0) {
            for (int i = 0; i < 100; i++) {
                this.emsUserRepository.save(
                        EmsUserEntity.builder()
                                .emsUserFirstName("some_first_name")
                                .emsUserLastName("some_last_name")
                                .emsUserGender(EmsUserGender.MALE)
                                .emsUserEmail("some_user" + i + "@gmail.com")
                                .emsUserDateOfBirth(LocalDate.now())
                                .emsUserDateOfJoin(LocalDate.now())
                                .emsUserSalary(EmsUtil.getBigDecimalValue(5000))
                                .emsUserHikePercentage(EmsUtil.getBigDecimalValue(25))
                                .emsUserZipCode(354616)
                                .emsUserMobileNumber("6546543215")
                                .build()
                );
            }
        }
    }

}
