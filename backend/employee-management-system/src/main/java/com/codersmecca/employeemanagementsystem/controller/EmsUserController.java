package com.codersmecca.employeemanagementsystem.controller;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSearchAndSort;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(value = "/ems-user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class EmsUserController {

    private final EmsUserService emsUserService;

    @PostMapping(value = "/import-ems-user", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> importEmsUser(
            @RequestPart(value = "emsUserMultipartFile") MultipartFile emsUserMultipartFile
    ) throws IOException {
        return this.emsUserService.importEmsUser(emsUserMultipartFile);
    }

    @PostMapping(value = "/add-new-ems-user", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> addNewEmsUser(
            @Valid @RequestBody AddNewEmsUserRequestBean addNewEmsUserRequestBean
    ) {
        return this.emsUserService.addNewEmsUser(addNewEmsUserRequestBean);
    }

    @PutMapping(value = "/update-ems-user", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> updateEmsUser(
            @Valid @RequestBody UpdateEmsUserRequestBean updateEmsUserRequestBean
    ) {
        return this.emsUserService.updateEmsUser(updateEmsUserRequestBean);
    }

    @GetMapping(value = "/get-all-ems-user", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> getAllEmsUser() {
        return this.emsUserService.getAllEmsUser();
    }

    @PostMapping(value = "/get-all-ems-user-with-pagination-and-search-and-sort", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> getAllEmsUserWithPaginationAndSearchAndSort(
            @Valid @RequestBody EmsUserRequestBeanWithPaginationAndSearchAndSort emsUserRequestBeanWithPaginationAndSearchAndSort
    ) {
        return this.emsUserService.getAllEmsUserWithPaginationAndSearchAndSort(emsUserRequestBeanWithPaginationAndSearchAndSort);
    }

    @DeleteMapping(value = "/delete-ems-user-by-id", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> deleteEmsUserById(
            @RequestParam(value = "id") String id
    ) {
        return this.emsUserService.deleteEmsUserById(id);
    }

    @GetMapping(value = "/get-dropdown-of-ems-user-gender", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsResponseEntity> getDropdownOfEmsUserGender() {
        return this.emsUserService.getDropdownOfEmsUserGender();
    }

}
