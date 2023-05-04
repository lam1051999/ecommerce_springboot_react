package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeRequest {
    @Length(max = 1000)
    @JsonProperty("old_password")
    private String oldPassword;

    @Length(max = 1000)
    @JsonProperty("new_password")
    private String newPassword;
}
