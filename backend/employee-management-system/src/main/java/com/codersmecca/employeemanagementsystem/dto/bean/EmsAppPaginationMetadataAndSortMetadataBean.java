package com.codersmecca.employeemanagementsystem.dto.bean;

import jakarta.validation.Valid;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsAppPaginationMetadataAndSortMetadataBean {

    @Valid
    private EmsAppPaginationMetadataBean emsAppPaginationMetadataBean;

    private List<EmsAppSortMetadataBean> emsAppSortMetadataBeanList = new ArrayList<>();

}
