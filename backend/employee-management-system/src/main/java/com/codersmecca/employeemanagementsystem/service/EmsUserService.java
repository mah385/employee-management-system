package com.codersmecca.employeemanagementsystem.service;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EmsUserService {

    ResponseEntity<EmsAppResponseEntity> importEmsUserData(MultipartFile emsUserDataMultipartFile) throws IOException;

    ResponseEntity<EmsAppResponseEntity> addNewEmsUser(AddNewEmsUserRequestBean addNewEmsUserRequestBean);

    ResponseEntity<EmsAppResponseEntity> updateEmsUser(UpdateEmsUserRequestBean updateEmsUserRequestBean);

    ResponseEntity<EmsAppResponseEntity> getAllEmsUser();

    ResponseEntity<EmsAppResponseEntity> getAllEmsUserWithPaginationAndSearchAndSort(EmsUserRequestBeanWithPaginationAndSearchAndSort emsUserRequestBeanWithPaginationAndSearchAndSort);

    ResponseEntity<EmsAppResponseEntity> deleteEmsUserById(Long id);

    ResponseEntity<EmsAppResponseEntity> getDropdownOfEmsUserGender();

}
