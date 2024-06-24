package com.codersmecca.employeemanagementsystem.utils;

import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class EmsUtil {

    public static BigDecimal getBigDecimalValue(Double value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_EVEN);
    }

    public static BigDecimal getBigDecimalValue(Long value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_EVEN);
    }

    public static BigDecimal getBigDecimalValue(Integer value) {
        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_EVEN);
    }

    public static BigDecimal getBigDecimalValue(String value) {
        return BigDecimal.valueOf(Double.parseDouble(value)).setScale(2, RoundingMode.HALF_EVEN);
    }

    public static String getFileExtension(
            final String fileName
    ) {
        return StringUtils.isBlank(fileName) ? null : fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    }

}
