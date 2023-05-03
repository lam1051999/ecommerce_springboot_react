package com.shopdunkclone.rest.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "ship_addresses", schema = "shopdunk")
public class ShipAddressesEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Basic
    @Column(name = "phone_number")
    @JsonProperty("phone_number")
    private String phoneNumber;

    @Basic
    @Column(name = "email")
    @JsonProperty("email")
    private String email;

    @Basic
    @Column(name = "exact_address")
    @JsonProperty("exact_address")
    private String exactAddress;

    @Basic
    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Basic
    @Column(name = "province_id")
    @JsonProperty("province_id")
    private String provinceId;
}
