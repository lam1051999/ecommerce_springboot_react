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
@Table(name = "stocks", schema = "shopdunk")
public class StocksEntity {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    private String id;

    @Basic
    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Basic
    @Column(name = "product_id")
    @JsonProperty("product_id")
    private String productId;
}
