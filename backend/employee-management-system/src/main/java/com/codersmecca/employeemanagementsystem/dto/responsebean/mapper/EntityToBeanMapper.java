package com.codersmecca.employeemanagementsystem.dto.responsebean.mapper;

import com.codersmecca.employeemanagementsystem.dto.projectionbean.GetEmsUserProjectionBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBean;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public interface EntityToBeanMapper {

    Function<List<EmsUserEntity>, List<GetEmsUserResponseBean>> mapMultipleEntityToBeanByUsingEmsUserEntityAndReturnGetEmsUserResponseBean = (emsUserEntityListSaved) -> {
        List<GetEmsUserResponseBean> getEmsUserResponseBeanList = new ArrayList<>();
        emsUserEntityListSaved.forEach(emsUserEntitySaved -> {
            getEmsUserResponseBeanList.add(
                    GetEmsUserResponseBean.builder()
                            .id(emsUserEntitySaved.getEmsUserId())
                            .firstName(emsUserEntitySaved.getEmsUserFirstName())
                            .lastName(emsUserEntitySaved.getEmsUserLastName())
                            .emsUserGender(emsUserEntitySaved.getEmsUserGender())
                            .email(emsUserEntitySaved.getEmsUserEmail())
                            .dateOfBirth(emsUserEntitySaved.getEmsUserDateOfBirth())
                            .dateOfJoin(emsUserEntitySaved.getEmsUserDateOfJoin())
                            .salary(emsUserEntitySaved.getEmsUserSalary())
                            .hikePercentage(emsUserEntitySaved.getEmsUserHikePercentage())
                            .zipCode(emsUserEntitySaved.getEmsUserZipCode())
                            .mobileNumber(emsUserEntitySaved.getEmsUserMobileNumber())
                            .build()
            );
        });
        return getEmsUserResponseBeanList;
    };

    Function<List<GetEmsUserProjectionBean>, List<GetEmsUserResponseBean>> mapMultipleEntityToBeanByUsingGetEmsUserProjectionBeanAndReturnGetEmsUserResponseBean = (getEmsUserRepositoryBeanList) -> {
        List<GetEmsUserResponseBean> getEmsUserResponseBeanList = new ArrayList<>();
        getEmsUserRepositoryBeanList.forEach(emsUserEntitySaved -> {
            getEmsUserResponseBeanList.add(
                    GetEmsUserResponseBean.builder()
                            .id(emsUserEntitySaved.getId())
                            .firstName(emsUserEntitySaved.getFirstName())
                            .lastName(emsUserEntitySaved.getLastName())
                            .emsUserGender(emsUserEntitySaved.getEmsUserGender())
                            .email(emsUserEntitySaved.getEmail())
                            .dateOfBirth(emsUserEntitySaved.getDateOfBirth())
                            .dateOfJoin(emsUserEntitySaved.getDateOfJoin())
                            .salary(emsUserEntitySaved.getSalary())
                            .hikePercentage(emsUserEntitySaved.getHikePercentage())
                            .zipCode(emsUserEntitySaved.getZipCode())
                            .mobileNumber(emsUserEntitySaved.getMobileNumber())
                            .build()
            );
        });
        return getEmsUserResponseBeanList;
    };

}
