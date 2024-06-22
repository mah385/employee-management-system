package com.codersmecca.employeemanagementsystem.dto.responsebean.mapper;

import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBean;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

public interface EntityToBeanMapper {

    Function<List<EmsUserEntity>, List<GetEmsUserResponseBean>> mapEntityToBeanForMultipleEmsUserEntity = (emsUserEntityListSaved) -> {
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
                            .createdTime(emsUserEntitySaved.getCreatedTime())
                            .updatedTime(emsUserEntitySaved.getUpdatedTime())
                            .build()
            );
        });
        return getEmsUserResponseBeanList;
    };

}
