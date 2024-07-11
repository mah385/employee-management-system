package com.codersmecca.employeemanagementsystem.dto.bean;

import lombok.*;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmsAppSortMetadata {

    private LocalDateTime sortOrderTimestamp;
    private Sort.Direction sortDirection;
    private String sortDirectionInputFieldName;

    @Override
    public String toString() {
        return "{" +
                "sortOrderTimestamp=" + sortOrderTimestamp +
                ", sortDirection=" + sortDirection +
                ", sortDirectionInputFieldName='" + sortDirectionInputFieldName + '\'' +
                '}';
    }

}
