package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.user.Gender;
import com.shopdunkclone.rest.model.user.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomersDto {
    @JsonProperty("id")
    private String id;

    @Length(max = 1000)
    @JsonProperty("name")
    private String name;

    @JsonProperty("gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @JsonProperty("dob")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Ho_Chi_Minh")
    private String dob;

    @Length(max = 255)
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Length(max = 255)
    @JsonProperty("email")
    private String email;

    @Length(max = 1000)
    @JsonProperty("username")
    private String username;

    @Length(max = 1000)
    @JsonProperty("password")
    private String password;

    @JsonProperty("role")
    @Enumerated(EnumType.STRING)
    private Role role;
}
