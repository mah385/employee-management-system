package com.codersmecca.employeemanagementsystem.dto.bean;

import lombok.*;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsAppSortMetadataBean {

    private String sortDirectionInputFieldName;
    private Sort.Direction sortDirection;
    private LocalDateTime sortOrderTimestamp;

    @Override
    public String toString() {
        return "{" +
                "sortDirectionInputFieldName='" + sortDirectionInputFieldName + '\'' +
                ", sortDirection=" + sortDirection +
                ", sortOrderTimestamp=" + sortOrderTimestamp +
                '}';
    }

}
