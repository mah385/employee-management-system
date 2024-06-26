package com.codersmecca.employeemanagementsystem.service;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EmsUserService {

    ResponseEntity<EmsResponseEntity> importEmsUserData(MultipartFile emsUserDataMultipartFile) throws IOException;

    ResponseEntity<EmsResponseEntity> addNewEmsUser(AddNewEmsUserRequestBean addNewEmsUserRequestBean);

    ResponseEntity<EmsResponseEntity> updateEmsUser(UpdateEmsUserRequestBean updateEmsUserRequestBean);

    ResponseEntity<EmsResponseEntity> getAllEmsUser();

    ResponseEntity<EmsResponseEntity> getAllEmsUserWithPaginationAndSearchAndSort(EmsUserRequestBeanWithPaginationAndSearchAndSort emsUserRequestBeanWithPaginationAndSearchAndSort);

    ResponseEntity<EmsResponseEntity> deleteEmsUserById(String id);

    ResponseEntity<EmsResponseEntity> getDropdownOfEmsUserGender();

}
