package com.shopdunkclone.rest.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @Length(max = 255)
    @JsonProperty("username")
    private String username;

    @Length(max = 1000)
    @JsonProperty("password")
    private String password;
}
