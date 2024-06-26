package com.codersmecca.employeemanagementsystem.utils;

import com.codersmecca.employeemanagementsystem.entity.EmsUserEntity;
import com.codersmecca.employeemanagementsystem.enums.EmsUserGender;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

import static com.codersmecca.employeemanagementsystem.constants.EmsConstant.*;

public class ImportEmsUserUtil {

    public static List<EmsUserEntity> importEmsUserData(
            final MultipartFile emsUserDataMultipartFile
    ) throws IOException {
//        CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
        try (
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(emsUserDataMultipartFile.getInputStream(), StandardCharsets.ISO_8859_1));
                CSVParser csvParser = new CSVParser(
                        bufferedReader,
                        CSVFormat.DEFAULT.builder()
                                .setHeader()
                                .setSkipHeaderRecord(Boolean.TRUE)
                                .setIgnoreHeaderCase(Boolean.TRUE)
                                .setAllowMissingColumnNames(Boolean.TRUE)
                                .setTrim(Boolean.TRUE)
                                .setAutoFlush(Boolean.TRUE)
                                .build()
                )
        ) {
            List<EmsUserEntity> emsUserEntityLinkedList = new LinkedList<>();
            List<CSVRecord> csvRecordList = csvParser.getRecords();
            for (CSVRecord csvRecord : csvRecordList) {
                emsUserEntityLinkedList.add(
                        EmsUserEntity.builder()
                                .emsUserFirstName(csvRecord.get(ZERO))
                                .emsUserLastName(csvRecord.get(ONE))
                                .emsUserGender(csvRecord.get(TWO).equals("F") ? EmsUserGender.FEMALE : EmsUserGender.MALE)
                                .emsUserEmail(csvRecord.get(THREE))
                                .emsUserDateOfBirth(LocalDate.parse(csvRecord.get(FOUR), DATE_TIME_FORMATTER))
                                .emsUserDateOfJoin(LocalDate.parse(csvRecord.get(FIVE), DATE_TIME_FORMATTER))
                                .emsUserSalary(EmsUtil.getBigDecimalValue(csvRecord.get(SIX)))
                                .emsUserHikePercentage(EmsUtil.getBigDecimalValue(csvRecord.get(SEVEN).replaceAll(REGEX_FOR_NUMBERS_WITH_DECIMAL, EMPTY_STRING)))
                                .emsUserZipCode(Integer.parseInt(csvRecord.get(EIGHT)))
                                .emsUserMobileNumber(RandomStringUtils.randomNumeric(TEN))
                                .build()
                );
            }
            return emsUserEntityLinkedList;
        } /*catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }*/
    }

}
