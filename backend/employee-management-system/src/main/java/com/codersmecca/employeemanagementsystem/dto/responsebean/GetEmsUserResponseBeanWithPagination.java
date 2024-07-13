package com.codersmecca.employeemanagementsystem.dto.responsebean;

import com.codersmecca.employeemanagementsystem.dto.bean.EmsAppPaginationMetadataBean;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetEmsUserResponseBeanWithPagination {

    private EmsAppPaginationMetadataBean emsAppPaginationMetadataBean;
    private List<GetEmsUserResponseBean> getEmsUserResponseBeanList = new ArrayList<>();


}
