package com.shopdunkclone.rest.util;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {
    private static final MessageDigest md5;
    static {
        try {
            md5 = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    public static final SimpleDateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    public static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    public static String getHashText(String inputStr) {
        byte[] hashByte = md5.digest(inputStr.getBytes(StandardCharsets.UTF_8));
        BigInteger bigIntHash = new BigInteger(1, hashByte);
        String hashText = bigIntHash.toString(16);
        while(hashText.length() < 32 ) {
            hashText = "0" + hashText;
        }
        return hashText;
    }
    public static Timestamp getTimestampFromString(String dateStr, SimpleDateFormat df) throws ParseException {
        Date date = df.parse(dateStr);
        return new Timestamp(date.getTime());
    }

    public static java.sql.Date getDateFromString(String dateStr, SimpleDateFormat df) throws ParseException {
        Date date = df.parse(dateStr);
        return new java.sql.Date(date.getTime());
    }
}
