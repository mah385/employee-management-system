package com.codersmecca.employeemanagementsystem.dto.requestbean.mapper;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;

import java.util.function.Function;

public interface BeanToEntityMapper {

    Function<AddNewEmsUserRequestBean, EmsUserEntity> mapBeanToEntityForAddingNewEmsUserEntity = (addNewEmsUserRequestBean) -> {
        return EmsUserEntity.builder()
                .emsUserFirstName(addNewEmsUserRequestBean.getFirstName())
                .emsUserLastName(addNewEmsUserRequestBean.getLastName())
                .emsUserGender(addNewEmsUserRequestBean.getEmsUserGender())
                .emsUserEmail(addNewEmsUserRequestBean.getEmail())
                .emsUserDateOfBirth(addNewEmsUserRequestBean.getDateOfBirth())
                .emsUserDateOfJoin(addNewEmsUserRequestBean.getDateOfJoin())
                .emsUserSalary(addNewEmsUserRequestBean.getSalary())
                .emsUserHikePercentage(addNewEmsUserRequestBean.getHikePercentage())
                .emsUserZipCode(addNewEmsUserRequestBean.getZipCode())
                .emsUserMobileNumber(addNewEmsUserRequestBean.getMobileNumber())
                .build();
    };

}
