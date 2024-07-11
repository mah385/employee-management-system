package com.codersmecca.employeemanagementsystem.dto.bean;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsAppPaginationMetadataBean {

    @NotNull(message = "Please provide page number")
    private Integer pageNumber;

    @NotNull(message = "Please provide page size")
    private Integer pageSize;

    private Integer totalNoOfPage;

}
