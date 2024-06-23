package com.codersmecca.employeemanagementsystem.dto.responsebean;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetDropdownOfEmsUserGenderResponseBean {

    private String label;
    private String value;

}
