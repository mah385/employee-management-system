package com.codersmecca.employeemanagementsystem.service.impl;

import com.codersmecca.employeemanagementsystem.dto.repositorybean.GetEmsUserRepositoryBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.mapper.BeanToEntityMapper;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetDropdownOfEmsUserGenderResponseBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.responsebean.mapper.EntityToBeanMapper;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import com.codersmecca.employeemanagementsystem.repository.EmsUserRepository;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import static com.codersmecca.employeemanagementsystem.constants.EmsResponseConstant.*;
import static com.codersmecca.employeemanagementsystem.utils.EmsResponseUtil.sendResponse;

@Service
@RequiredArgsConstructor
public class EmsUserServiceImpl implements EmsUserService {

    private final EmsUserRepository emsUserRepository;

    @Override
    public ResponseEntity<EmsResponseEntity> addNewEmsUser(
            final AddNewEmsUserRequestBean addNewEmsUserRequestBean
    ) {
        if (this.emsUserRepository.existsByEmsUserEmail(addNewEmsUserRequestBean.getEmail())) {
            return sendResponse(HttpStatus.BAD_REQUEST, "User Email Already Exists.");
        } else {
            this.emsUserRepository.save(
                    BeanToEntityMapper.mapBeanToEntityForAddingNewEmsUserEntity.apply(addNewEmsUserRequestBean)
            );

            return sendResponse(
                    HttpStatus.CREATED,
                    DATA_CREATED_SUCCESSFULLY_MSG
            );
        }
    }

    @Override
    public ResponseEntity<EmsResponseEntity> updateEmsUser(
            final UpdateEmsUserRequestBean updateEmsUserRequestBean
    ) {
        this.emsUserRepository.updateEmsUser(
                updateEmsUserRequestBean.getFirstName(),
                updateEmsUserRequestBean.getLastName(),
                updateEmsUserRequestBean.getEmsUserGender(),
                updateEmsUserRequestBean.getDateOfBirth(),
                updateEmsUserRequestBean.getDateOfJoin(),
                updateEmsUserRequestBean.getSalary(),
                updateEmsUserRequestBean.getHikePercentage(),
                updateEmsUserRequestBean.getZipCode(),
                updateEmsUserRequestBean.getMobileNumber(),
                updateEmsUserRequestBean.getId()
        );

        return sendResponse(
                HttpStatus.OK,
                DATA_UPDATED_SUCCESSFULLY_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> getAllEmsUser() {
        return sendResponse(
                EntityToBeanMapper.mapMultipleEntityToBeanByUsingEmsUserEntityAndReturnGetEmsUserResponseBean.apply(this.emsUserRepository.findAll()),
                HttpStatus.OK,
                SHOWING_RESPONSE_DATA_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> getAllEmsUserWithPaginationAndSearchAndSort(
            final EmsUserRequestBeanWithPaginationAndSearchAndSort emsUserRequestBeanWithPaginationAndSearchAndSort
    ) {
        Page<GetEmsUserRepositoryBean> getEmsUserRepositoryBeanWithPaginationAndSearchAndSort = this.emsUserRepository.findAllEmsUserWithPaginationAndSearchAndSort(
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchFirstName(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchLastName(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchEmsUserGender(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchEmail(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchDateOfBirth(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchDateOfJoin(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchSalary(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchHikePercentage(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchZipCode(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchMobileNumber(),
                PageRequest.of((emsUserRequestBeanWithPaginationAndSearchAndSort.getPageNumber() - 1), emsUserRequestBeanWithPaginationAndSearchAndSort.getPageSize())
        );

        GetEmsUserResponseBeanWithPaginationAndSearchAndSort getEmsUserResponseBeanWithPaginationAndSearchAndSort = GetEmsUserResponseBeanWithPaginationAndSearchAndSort.builder()
                .getEmsUserResponseBeanList(
                        EntityToBeanMapper.mapMultipleEntityToBeanByUsingGetEmsUserRepositoryBeanAndReturnGetEmsUserResponseBean.apply(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getContent())
                )
                .pageNumber(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getPageable().getPageNumber() + 1)
                .pageSize(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getPageable().getPageSize())
                .totalNoOfPage(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getTotalPages())
                .build();

        return sendResponse(
                getEmsUserResponseBeanWithPaginationAndSearchAndSort,
                HttpStatus.OK,
                SHOWING_RESPONSE_DATA_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> deleteEmsUserById(
            final String id
    ) {
        this.emsUserRepository.deleteById(id);

        return sendResponse(
                HttpStatus.OK,
                DATA_DELETED_SUCCESSFULLY_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> getDropdownOfEmsUserGender() {
        List<GetDropdownOfEmsUserGenderResponseBean> getDropdownOfEmsUserGenderResponseBeanLinkedList = new LinkedList<>();
        Arrays.stream(EmsUserGender.values())
                .sorted(Comparator.comparing(EmsUserGender::getLabel))
                .forEach(emsUserGender -> {
                    getDropdownOfEmsUserGenderResponseBeanLinkedList.add(
                            GetDropdownOfEmsUserGenderResponseBean.builder()
                                    .label(emsUserGender.getLabel())
                                    .value(emsUserGender.name())
                                    .build()
                    );
                });

        return sendResponse(
                getDropdownOfEmsUserGenderResponseBeanLinkedList,
                HttpStatus.OK,
                SHOWING_RESPONSE_DATA_MSG
        );
    }

}
