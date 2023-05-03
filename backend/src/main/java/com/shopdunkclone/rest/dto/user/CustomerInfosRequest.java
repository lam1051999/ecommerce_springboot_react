package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.user.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfosRequest {
    @Length(max = 1000)
    @JsonProperty("name")
    private String name;

    @JsonProperty("gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @JsonProperty("dob")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Ho_Chi_Minh")
    private Date dob;

    @Length(max = 255)
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Length(max = 255)
    @JsonProperty("email")
    private String email;
}
