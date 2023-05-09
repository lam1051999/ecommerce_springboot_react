package com.shopdunkclone.rest.model.product;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "product_ratings", schema = "shopdunk")
public class ProductRatingsEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "person_name")
    @JsonProperty("person_name")
    private String personName;

    @Basic
    @Column(name = "review")
    @JsonProperty("review")
    private String review;

    @Basic
    @Column(name = "num_stars")
    @JsonProperty("num_stars")
    private Integer numStars;

    @Basic
    @Column(name = "created")
    @JsonProperty("created")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp created;

    @Basic
    @Column(name = "modified")
    @JsonProperty("modified")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp modified;

    @Basic
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;

    @Basic
    @Column(name = "username")
    @JsonProperty("username")
    private String username;
}
