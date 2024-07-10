package com.codersmecca.employeemanagementsystem.service.impl;

import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppPaginationMetadata;
import com.codersmecca.employeemanagementsystem.dto.repositorybean.GetEmsUserRepositoryBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.mapper.BeanToEntityMapper;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetDropdownOfEmsUserGenderResponseBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.responsebean.mapper.EntityToBeanMapper;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import com.codersmecca.employeemanagementsystem.repository.EmsUserRepository;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseEntity;
import com.codersmecca.employeemanagementsystem.utils.EmsAppUtil;
import com.codersmecca.employeemanagementsystem.utils.ImportEmsUserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import static com.codersmecca.employeemanagementsystem.constants.EmsAppResponseConstant.*;
import static com.codersmecca.employeemanagementsystem.utils.EmsAppResponseUtil.sendResponse;

@Service
@RequiredArgsConstructor
public class EmsUserServiceImpl implements EmsUserService {

    private final EmsUserRepository emsUserRepository;

    @Value("${spring.jpa.properties.hibernate.jdbc.batch_size}")
    private Integer hibernateJdbcBatchSize;

    @Transactional
    @Override
    public ResponseEntity<EmsAppResponseEntity> importEmsUserData(
            final MultipartFile emsUserDataMultipartFile
    ) throws IOException {
        if (emsUserDataMultipartFile.isEmpty()) {
            return sendResponse(HttpStatus.BAD_REQUEST, UPLOAD_FILE_IS_MISSING_MSG);
        } else {
            if ("csv".equals(EmsAppUtil.getFileExtension(emsUserDataMultipartFile.getOriginalFilename()))) {
                List<EmsUserEntity> emsUserEntityLinkedList = ImportEmsUserUtil.importEmsUserData(emsUserDataMultipartFile);
                for (int i = 0; i < emsUserEntityLinkedList.size(); i = i + hibernateJdbcBatchSize) {
                    if (i + hibernateJdbcBatchSize > emsUserEntityLinkedList.size()) {
                        emsUserRepository.saveAll(emsUserEntityLinkedList.subList(i, emsUserEntityLinkedList.size() - 1));
                        break;
                    }
                    List<EmsUserEntity> emsUserEntityLinkedSubList = emsUserEntityLinkedList.subList(i, i + hibernateJdbcBatchSize);
                    emsUserRepository.saveAll(emsUserEntityLinkedSubList);
                }
                return sendResponse(HttpStatus.OK, DATA_IMPORTED_SUCCESSFULLY_MSG);
            } else {
                return sendResponse(HttpStatus.BAD_REQUEST, INVALID_FILE_FORMAT_UPLOADED_MSG);
            }
        }
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> addNewEmsUser(
            final AddNewEmsUserRequestBean addNewEmsUserRequestBean
    ) {
        if (this.emsUserRepository.existsByEmsUserEmail(addNewEmsUserRequestBean.getEmail())) {
            return sendResponse(HttpStatus.BAD_REQUEST, "User Email Already Exists.");
        } else {
            this.emsUserRepository.save(BeanToEntityMapper.mapBeanToEntityForAddingNewEmsUserEntity.apply(addNewEmsUserRequestBean));
            return sendResponse(HttpStatus.CREATED, DATA_CREATED_SUCCESSFULLY_MSG);
        }
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> updateEmsUser(
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
        return sendResponse(HttpStatus.OK, DATA_UPDATED_SUCCESSFULLY_MSG);
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> getAllEmsUser() {
        List<GetEmsUserResponseBean> getEmsUserResponseBeanList = EntityToBeanMapper.mapMultipleEntityToBeanByUsingEmsUserEntityAndReturnGetEmsUserResponseBean.apply(this.emsUserRepository.findAll());
        return sendResponse(getEmsUserResponseBeanList, HttpStatus.OK, getEmsUserResponseBeanList.isEmpty() ? DATA_NOT_FOUND_MSG : SHOWING_RESPONSE_DATA_MSG);
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> getAllEmsUserWithPaginationAndSearchAndSort(
            final EmsUserRequestBeanWithPaginationAndSearchAndSort emsUserRequestBeanWithPaginationAndSearchAndSort
    ) {
        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForFirstName() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForFirstName(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForFirstName().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForLastName() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForLastName(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForLastName().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForEmail() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForEmail(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForEmail().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfBirth() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForDateOfBirth(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfBirth().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfJoin() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForDateOfJoin(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfJoin().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForMobileNumber() != null) {
            emsUserRequestBeanWithPaginationAndSearchAndSort.setSearchValueForMobileNumber(emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForMobileNumber().strip());
        }
        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        Sort sortByRespectiveField = Sort.unsorted();

        Sort.Direction sortDirectionForFirstName = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForFirstName();
        Sort.Direction sortDirectionForLastName = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForLastName();
        Sort.Direction sortDirectionForEmsUserGender = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForEmsUserGender();
        Sort.Direction sortDirectionForEmail = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForEmail();
        Sort.Direction sortDirectionForDateOfBirth = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForDateOfBirth();
        Sort.Direction sortDirectionForDateOfJoin = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForDateOfJoin();
        Sort.Direction sortDirectionForSalary = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForSalary();
        Sort.Direction sortDirectionForHikePercentage = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForHikePercentage();
        Sort.Direction sortDirectionForZipCode = emsUserRequestBeanWithPaginationAndSearchAndSort.getSortDirectionForZipCode();

        if (sortDirectionForFirstName != null) {
            Sort sortByFirstName = Sort.by("emsUserFirstName");
            sortByRespectiveField = sortDirectionForFirstName.isAscending() ? sortByFirstName.ascending() : sortByFirstName.descending();
        }
        if (sortDirectionForLastName != null) {
            Sort sortByLastName = Sort.by("emsUserLastName");
            sortByRespectiveField = sortDirectionForLastName.isAscending() ? sortByLastName.ascending() : sortByLastName.descending();
        }
        if (sortDirectionForEmsUserGender != null) {
            Sort sortByEmsUserGender = Sort.by("emsUserGender");
            sortByRespectiveField = sortDirectionForEmsUserGender.isAscending() ? sortByEmsUserGender.ascending() : sortByEmsUserGender.descending();
        }
        if (sortDirectionForEmail != null) {
            Sort sortByEmail = Sort.by("emsUserEmail");
            sortByRespectiveField = sortDirectionForEmail.isAscending() ? sortByEmail.ascending() : sortByEmail.descending();
        }
        if (sortDirectionForDateOfBirth != null) {
            Sort sortByDateOfBirth = Sort.by("emsUserDateOfBirth");
            sortByRespectiveField = sortDirectionForDateOfBirth.isAscending() ? sortByDateOfBirth.ascending() : sortByDateOfBirth.descending();
        }
        if (sortDirectionForDateOfJoin != null) {
            Sort sortByDateOfJoin = Sort.by("emsUserDateOfJoin");
            sortByRespectiveField = sortDirectionForDateOfJoin.isAscending() ? sortByDateOfJoin.ascending() : sortByDateOfJoin.descending();
        }
        if (sortDirectionForSalary != null) {
            Sort sortBySalary = Sort.by("emsUserSalary");
            sortByRespectiveField = sortDirectionForSalary.isAscending() ? sortBySalary.ascending() : sortBySalary.descending();
        }
        if (sortDirectionForHikePercentage != null) {
            Sort sortByHikePercentage = Sort.by("emsUserHikePercentage");
            sortByRespectiveField = sortDirectionForHikePercentage.isAscending() ? sortByHikePercentage.ascending() : sortByHikePercentage.descending();
        }
        if (sortDirectionForZipCode != null) {
            Sort sortByZipCode = Sort.by("emsUserZipCode");
            sortByRespectiveField = sortDirectionForZipCode.isAscending() ? sortByZipCode.ascending() : sortByZipCode.descending();
        }
        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

        Page<GetEmsUserRepositoryBean> getEmsUserRepositoryBeanWithPaginationAndSearchAndSort = this.emsUserRepository.findAllEmsUserWithPaginationAndSearchAndSort(
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForFirstName(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForLastName(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForEmsUserGender(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForEmail(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfBirth(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForDateOfJoin(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForSalary(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForHikePercentage(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForZipCode(),
                emsUserRequestBeanWithPaginationAndSearchAndSort.getSearchValueForMobileNumber(),
                PageRequest.of((emsUserRequestBeanWithPaginationAndSearchAndSort.getPageNumber() - 1), emsUserRequestBeanWithPaginationAndSearchAndSort.getPageSize(), sortByRespectiveField)
        );

        GetEmsUserResponseBeanWithPaginationAndSearchAndSort getEmsUserResponseBeanWithPaginationAndSearchAndSort = GetEmsUserResponseBeanWithPaginationAndSearchAndSort.builder()
                .getEmsUserResponseBeanList(
                        EntityToBeanMapper.mapMultipleEntityToBeanByUsingGetEmsUserRepositoryBeanAndReturnGetEmsUserResponseBean.apply(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getContent())
                )
                .emsAppPaginationMetadata(
                        EmsAppPaginationMetadata.builder()
                                .pageNumber(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getPageable().getPageNumber() + 1)
                                .pageSize(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getPageable().getPageSize())
                                .totalNoOfPage(getEmsUserRepositoryBeanWithPaginationAndSearchAndSort.getTotalPages())
                                .build()
                )
                .build();

        return sendResponse(getEmsUserResponseBeanWithPaginationAndSearchAndSort, HttpStatus.OK, SHOWING_RESPONSE_DATA_MSG);
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> deleteEmsUserById(
            final Long id
    ) {
        this.emsUserRepository.deleteById(id);
        return sendResponse(HttpStatus.OK, DATA_DELETED_SUCCESSFULLY_MSG);
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> getDropdownOfEmsUserGender() {
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

        return sendResponse(getDropdownOfEmsUserGenderResponseBeanLinkedList, HttpStatus.OK, SHOWING_RESPONSE_DATA_MSG);
    }

}
