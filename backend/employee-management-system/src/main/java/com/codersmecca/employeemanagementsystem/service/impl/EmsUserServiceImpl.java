package com.codersmecca.employeemanagementsystem.service.impl;

import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppPaginationMetadataBean;
import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppSortMetadataBean;
import com.codersmecca.employeemanagementsystem.dto.projectionbean.GetEmsUserProjectionBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSortAndSearch;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.mapper.BeanToEntityMapper;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetDropdownOfEmsUserGenderResponseBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBean;
import com.codersmecca.employeemanagementsystem.dto.responsebean.GetEmsUserResponseBeanWithPagination;
import com.codersmecca.employeemanagementsystem.dto.responsebean.mapper.EntityToBeanMapper;
import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import com.codersmecca.employeemanagementsystem.repository.EmsUserRepository;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseEntity;
import com.codersmecca.employeemanagementsystem.utils.EmsAppUtil;
import com.codersmecca.employeemanagementsystem.utils.ImportEmsUserUtil;
import lombok.RequiredArgsConstructor;
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
                this.emsUserRepository.saveAll(emsUserEntityLinkedList);
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

    String getPropertyNameBySortDirectionInputFieldName(
            final String sortDirectionInputFieldName
    ) {
        String propertyName = null;
        if ("firstName".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserFirstName";
        } else if ("lastName".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserLastName";
        } else if ("emsUserGender".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserGender";
        } else if ("email".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserEmail";
        } else if ("dateOfBirth".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserDateOfBirth";
        } else if ("dateOfJoin".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserDateOfJoin";
        } else if ("salary".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserSalary";
        } else if ("hikePercentage".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserHikePercentage";
        } else if ("zipCode".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserZipCode";
        } else if ("mobileNumber".equals(sortDirectionInputFieldName)) {
            propertyName = "emsUserMobileNumber";
        }
        return propertyName;
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> getAllEmsUserWithPaginationAndSortAndSearch(
            final EmsUserRequestBeanWithPaginationAndSortAndSearch emsUserRequestBeanWithPaginationAndSortAndSearch
    ) {
        EmsAppPaginationMetadataBean emsAppPaginationMetadataBean = emsUserRequestBeanWithPaginationAndSortAndSearch.getEmsAppPaginationMetadataAndSortMetadataBean().getEmsAppPaginationMetadataBean();
        List<EmsAppSortMetadataBean> emsAppSortMetadataBeanList = emsUserRequestBeanWithPaginationAndSortAndSearch.getEmsAppPaginationMetadataAndSortMetadataBean().getEmsAppSortMetadataBeanList();
        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForFirstName() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForFirstName(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForFirstName().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForLastName() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForLastName(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForLastName().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForEmail() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForEmail(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForEmail().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfBirth() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForDateOfBirth(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfBirth().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfJoin() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForDateOfJoin(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfJoin().strip());
        }
        if (emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForMobileNumber() != null) {
            emsUserRequestBeanWithPaginationAndSortAndSearch.setSearchValueForMobileNumber(emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForMobileNumber().strip());
        }
        /*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

        List<Sort.Order> sortOrderList = new LinkedList<>();

        emsAppSortMetadataBeanList.stream()
                .sorted(Comparator.comparing(EmsAppSortMetadataBean::getSortOrderTimestamp))
                .forEach(emsAppSortMetadataBean -> {
                    System.out.println("emsAppSortMetadataBean: " + emsAppSortMetadataBean);
                    sortOrderList.add(
                            new Sort.Order(emsAppSortMetadataBean.getSortDirection(), getPropertyNameBySortDirectionInputFieldName(emsAppSortMetadataBean.getSortDirectionInputFieldName()))
                    );
                });

        System.out.println("sortOrderList: " + sortOrderList);

        Page<GetEmsUserProjectionBean> getEmsUserProjectionBean = this.emsUserRepository.findAllEmsUserWithPaginationAndSearchAndSort(
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForFirstName(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForLastName(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForEmsUserGender(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForEmail(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfBirth(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForDateOfJoin(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForSalary(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForHikePercentage(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForZipCode(),
                emsUserRequestBeanWithPaginationAndSortAndSearch.getSearchValueForMobileNumber(),
                PageRequest.of(
                        (emsAppPaginationMetadataBean.getPageNumber() - 1),
                        emsAppPaginationMetadataBean.getPageSize(),
                        sortOrderList.isEmpty() ? Sort.unsorted() : Sort.by(sortOrderList)
                )
        );

        GetEmsUserResponseBeanWithPagination getEmsUserResponseBeanWithPagination = GetEmsUserResponseBeanWithPagination.builder()
                .emsAppPaginationMetadataBean(
                        EmsAppPaginationMetadataBean.builder()
                                .pageNumber(getEmsUserProjectionBean.getPageable().getPageNumber() + 1)
                                .pageSize(getEmsUserProjectionBean.getPageable().getPageSize())
                                .totalPages(getEmsUserProjectionBean.getTotalPages())
                                .totalElements(getEmsUserProjectionBean.getTotalElements())
                                .build()
                )
                .getEmsUserResponseBeanList(
                        EntityToBeanMapper.mapMultipleEntityToBeanByUsingGetEmsUserProjectionBeanAndReturnGetEmsUserResponseBean.apply(getEmsUserProjectionBean.getContent())
                )
                .build();

        return sendResponse(getEmsUserResponseBeanWithPagination, HttpStatus.OK, SHOWING_RESPONSE_DATA_MSG);
    }

    @Override
    public ResponseEntity<EmsAppResponseEntity> deleteEmsUserById(
            final String id
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
