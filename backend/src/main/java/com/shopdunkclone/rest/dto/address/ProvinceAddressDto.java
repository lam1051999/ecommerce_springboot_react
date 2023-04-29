package com.shopdunkclone.rest.dto.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shopdunkclone.rest.model.address.ShopdunkShopsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProvinceAddressDto {
    @JsonProperty("id")
    String id;

    @JsonProperty("province_name")
    String provinceName;

    @JsonProperty("district_name")
    String districtName;

    @JsonProperty("list_shops")
    List<ShopdunkShopsEntity> listShops;
}
