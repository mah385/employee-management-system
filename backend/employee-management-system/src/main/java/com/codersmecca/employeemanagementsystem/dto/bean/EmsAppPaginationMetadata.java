package com.codersmecca.employeemanagementsystem.dto.bean;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsAppPaginationMetadata {

    private Integer pageNumber;
    private Integer pageSize;
    private Integer totalNoOfPage;

}
