package com.example.template.common.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import java.util.UUID;

public class CodeUtils {
    private static final DateTimeFormatter ENTITY_CODE_FORMATTER = DateTimeFormatter.ofPattern("yyMMdd-HHmmss");

    private CodeUtils() {
    }

    public static Long generatePaymentCode() {
        long timestamp = Instant.now().getEpochSecond();
        int randomBits = ThreadLocalRandom.current().nextInt(1000, 10000);
        String codeStr = String.valueOf(timestamp) + randomBits;
        return Long.parseLong(codeStr);
    }

    public static String generateRandomCode(String prefix) {
        String timestamp = LocalDateTime.now().format(ENTITY_CODE_FORMATTER);
        String randomSuffix = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        return String.format("%s-%s-%s", prefix, timestamp, randomSuffix);
    }

    public static String generateUUIDCode() {
        return UUID.randomUUID().toString();
    }

    public static String generateSixDigitOTP() {
        int otp = ThreadLocalRandom.current().nextInt(100000, 1000000);
        return String.valueOf(otp);
    }
}
