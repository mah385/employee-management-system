package com.codersmecca.employeemanagementsystem.utils;

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

}
