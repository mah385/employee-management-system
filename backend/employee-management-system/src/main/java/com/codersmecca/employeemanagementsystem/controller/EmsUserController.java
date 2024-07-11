package com.codersmecca.employeemanagementsystem.controller;

import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.EmsUserRequestBeanWithPaginationAndSortAndSearch;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsAppResponseEntity;
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
//@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}) //this solution is specific to this controller
public class EmsUserController {

    private final EmsUserService emsUserService;

    @PostMapping(value = "/import-ems-user-data", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> importEmsUserData(
            @RequestPart(value = "emsUserDataMultipartFile") MultipartFile emsUserDataMultipartFile
    ) throws IOException {
        return this.emsUserService.importEmsUserData(emsUserDataMultipartFile);
    }

    @PostMapping(value = "/add-new-ems-user", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> addNewEmsUser(
            @Valid @RequestBody AddNewEmsUserRequestBean addNewEmsUserRequestBean
    ) {
        return this.emsUserService.addNewEmsUser(addNewEmsUserRequestBean);
    }

    @PutMapping(value = "/update-ems-user", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> updateEmsUser(
            @Valid @RequestBody UpdateEmsUserRequestBean updateEmsUserRequestBean
    ) {
        return this.emsUserService.updateEmsUser(updateEmsUserRequestBean);
    }

    @GetMapping(value = "/get-all-ems-user", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> getAllEmsUser() {
        return this.emsUserService.getAllEmsUser();
    }

    @PostMapping(value = "/get-all-ems-user-with-pagination-and-sort-and-search", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> getAllEmsUserWithPaginationAndSortAndSearch(
            @Valid @RequestBody EmsUserRequestBeanWithPaginationAndSortAndSearch emsUserRequestBeanWithPaginationAndSortAndSearch
    ) {
        return this.emsUserService.getAllEmsUserWithPaginationAndSortAndSearch(emsUserRequestBeanWithPaginationAndSortAndSearch);
    }

    @DeleteMapping(value = "/delete-ems-user-by-id", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> deleteEmsUserById(
            @RequestParam(value = "id") Long id
    ) {
        return this.emsUserService.deleteEmsUserById(id);
    }

    @GetMapping(value = "/get-dropdown-of-ems-user-gender", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<EmsAppResponseEntity> getDropdownOfEmsUserGender() {
        return this.emsUserService.getDropdownOfEmsUserGender();
    }

}
