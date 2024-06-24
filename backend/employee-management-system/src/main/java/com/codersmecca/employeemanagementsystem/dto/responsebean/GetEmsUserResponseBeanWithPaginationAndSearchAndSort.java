package com.codersmecca.employeemanagementsystem.dto.responsebean;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetEmsUserResponseBeanWithPaginationAndSearchAndSort {

    private List<GetEmsUserResponseBean> getEmsUserResponseBeanList = new ArrayList<>();
    private Integer pageNumber;
    private Integer pageSize;
    private Integer totalNoOfPage;

}
