package com.codersmecca.employeemanagementsystem.service;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseEntity;
import org.springframework.http.ResponseEntity;

public interface EmsUserService {

    ResponseEntity<EmsResponseEntity> addNewEmsUser(AddNewEmsUserRequestBean addNewEmsUserRequestBean);

    ResponseEntity<EmsResponseEntity> updateEmsUser(UpdateEmsUserRequestBean updateEmsUserRequestBean);

    ResponseEntity<EmsResponseEntity> getAllEmsUser();

    ResponseEntity<EmsResponseEntity> deleteEmsUserById(String id);

    ResponseEntity<EmsResponseEntity> getDropdownOfEmsUserGender();

}
