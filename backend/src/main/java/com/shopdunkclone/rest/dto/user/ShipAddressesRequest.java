package com.shopdunkclone.rest.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShipAddressesRequest {
    @Length(max = 1000)
    @JsonProperty("name")
    private String name;

    @Length(max = 255)
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Length(max = 255)
    @JsonProperty("email")
    private String email;

    @JsonProperty("exact_address")
    private String exactAddress;

    @Length(max = 32)
    @JsonProperty("province_id")
    private String provinceId;
}
