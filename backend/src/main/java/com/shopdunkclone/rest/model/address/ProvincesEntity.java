package com.shopdunkclone.rest.model.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "provinces", schema = "shopdunk")
public class ProvincesEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "province_name")
    @JsonProperty("province_name")
    private String provinceName;

    @Basic
    @Column(name = "district_name")
    @JsonProperty("district_name")
    private String districtName;
}
