package com.codersmecca.employeemanagementsystem.service.impl;

import com.codersmecca.employeemanagementsystem.constants.EmsResponseConstant;
import com.codersmecca.employeemanagementsystem.dto.requestbean.AddNewEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.UpdateEmsUserRequestBean;
import com.codersmecca.employeemanagementsystem.dto.requestbean.mapper.BeanToEntityMapper;
import com.codersmecca.employeemanagementsystem.dto.responsebean.mapper.EntityToBeanMapper;
import com.codersmecca.employeemanagementsystem.repository.EmsUserRepository;
import com.codersmecca.employeemanagementsystem.service.EmsUserService;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseEntity;
import com.codersmecca.employeemanagementsystem.utils.EmsResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmsUserServiceImpl implements EmsUserService {

    private final EmsUserRepository emsUserRepository;

    @Override
    public ResponseEntity<EmsResponseEntity> addNewEmsUser(
            final AddNewEmsUserRequestBean addNewEmsUserRequestBean
    ) {
        if (this.emsUserRepository.existsByEmsUserEmail(addNewEmsUserRequestBean.getEmail())) {
            return EmsResponseUtil.sendResponse(HttpStatus.BAD_REQUEST, "User Email Already Exists.");
        } else {
            this.emsUserRepository.save(
                    BeanToEntityMapper.mapBeanToEntityForAddingNewEmsUserEntity.apply(addNewEmsUserRequestBean)
            );

            return EmsResponseUtil.sendResponse(
                    HttpStatus.CREATED,
                    EmsResponseConstant.DATA_CREATED_SUCCESSFULLY_MSG
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
                updateEmsUserRequestBean.getEmail(),
                updateEmsUserRequestBean.getDateOfBirth(),
                updateEmsUserRequestBean.getDateOfJoin(),
                updateEmsUserRequestBean.getSalary(),
                updateEmsUserRequestBean.getHikePercentage(),
                updateEmsUserRequestBean.getZipCode(),
                updateEmsUserRequestBean.getMobileNumber(),
                updateEmsUserRequestBean.getId()
        );

        return EmsResponseUtil.sendResponse(
                HttpStatus.OK,
                EmsResponseConstant.DATA_UPDATED_SUCCESSFULLY_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> getAllEmsUser() {
        return EmsResponseUtil.sendResponse(
                EntityToBeanMapper.mapEntityToBeanForMultipleEmsUserEntity.apply(this.emsUserRepository.findAll()),
                HttpStatus.OK,
                EmsResponseConstant.SHOWING_RESPONSE_DATA_MSG
        );
    }

    @Override
    public ResponseEntity<EmsResponseEntity> deleteEmsUserById(
            final String id
    ) {
        this.emsUserRepository.deleteById(id);

        return EmsResponseUtil.sendResponse(
                HttpStatus.OK,
                EmsResponseConstant.DATA_DELETED_SUCCESSFULLY_MSG
        );
    }

}
