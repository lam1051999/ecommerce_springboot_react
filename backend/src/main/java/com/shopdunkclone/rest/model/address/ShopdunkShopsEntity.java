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
@Table(name = "shopdunk_shops", schema = "shopdunk")
public class ShopdunkShopsEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Basic
    @Column(name = "province_id")
    @JsonProperty("province_id")
    private String provinceId;
}
